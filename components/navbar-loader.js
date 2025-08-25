// Navigation Component Loader
// This script dynamically loads the navigation component into any page

class NavigationLoader {
    constructor() {
        this.navbarHTML = null;
        this.navbarCSS = null;
        this.navbarJS = null;
        this.loaded = false;
    }

    async loadComponents() {
        if (this.loaded) return;

        try {
            // Determine the correct path to components based on current page location
            const currentPath = window.location.pathname;
            const isRoot = currentPath === '/' || currentPath === '/index.html';
            const isSubdirectory = currentPath.includes('/') && !isRoot;
            const basePath = isSubdirectory ? '../components/' : 'components/';
            
            console.log('Navigation path detection:', {
                currentPath,
                isRoot,
                isSubdirectory,
                basePath
            });
            
            // Check if we're running on localhost
            const isLocalhost = window.location.hostname === 'localhost' || 
                               window.location.hostname === '127.0.0.1';
            
            if (isLocalhost) {
                console.log('Using inline navigation for localhost');
                // For localhost, create a simple inline navigation to avoid routing issues
                this.createInlineNavigation();
                return;
            }
            
            // Load HTML component
            const htmlResponse = await fetch(basePath + 'navbar.html');
            if (!htmlResponse.ok) {
                throw new Error(`Failed to load navbar.html: ${htmlResponse.status} ${htmlResponse.statusText}`);
            }
            this.navbarHTML = await htmlResponse.text();

            // Load CSS component
            const cssResponse = await fetch(basePath + 'navbar.css');
            if (!cssResponse.ok) {
                throw new Error(`Failed to load navbar.css: ${cssResponse.status} ${cssResponse.statusText}`);
            }
            this.navbarCSS = await cssResponse.text();

            // Load JS component
            const jsResponse = await fetch(basePath + 'navbar.js');
            if (!jsResponse.ok) {
                throw new Error(`Failed to load navbar.js: ${jsResponse.status} ${jsResponse.statusText}`);
            }
            this.navbarJS = await jsResponse.text();

            this.loaded = true;
            console.log('Navigation components loaded successfully');
        } catch (error) {
            console.error('Error loading navigation components:', error);
        }
    }

    injectNavigation() {
        if (!this.loaded) {
            return;
        }

        // Inject CSS
        if (!document.querySelector('#navbar-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'navbar-styles';
            styleElement.textContent = this.navbarCSS;
            document.head.appendChild(styleElement);

        }

        // Inject HTML - replace the placeholder div
        const placeholder = document.querySelector('#navbar-placeholder');
        if (placeholder) {
            placeholder.outerHTML = this.navbarHTML;
        } else {
            // Fallback: insert at the beginning of body if no placeholder exists
            document.body.insertAdjacentHTML('afterbegin', this.navbarHTML);
        }

        // Wait a bit for DOM to update, then inject JavaScript
        setTimeout(() => {
            if (!document.querySelector('#navbar-script')) {
                const scriptElement = document.createElement('script');
                scriptElement.id = 'navbar-script';
                scriptElement.textContent = this.navbarJS;
                document.body.appendChild(scriptElement);

            }
        }, 100);
    }

    async initialize() {
        await this.loadComponents();
        this.injectNavigation();
        
        // Wait for DOM to be fully updated before setting active states
        setTimeout(() => {
            // Update paths based on current page location
            this.updatePaths();
        }, 200);
        
        // Also try to set active states after a longer delay as a fallback
        setTimeout(() => {
            console.log('Fallback: Setting active states after longer delay');
            this.setActiveStates();
        }, 1000);
    }

    updatePaths() {
        const currentPath = window.location.pathname;
        const isRoot = currentPath === '/' || currentPath === '/index.html';
        const isSubdirectory = currentPath.includes('/') && !isRoot;
        

        
        // Update logo links
        const logoLinks = document.querySelectorAll('.logo-link, .center-logo-link');
        logoLinks.forEach(link => {
            if (isSubdirectory) {
                link.href = '../';
            } else {
                link.href = '/';
            }
        });

        // Update logo image sources
        const logoImages = document.querySelectorAll('.logo-image, .center-logo-image');
        logoImages.forEach(img => {
            if (isSubdirectory) {
                img.src = '../logo-test.png';
            } else {
                img.src = 'logo-test.png';
            }
        });

        // Update navigation links based on current page
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .submenu-bubble-item');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                if (isSubdirectory) {
                    // For subpages, we need to adjust paths for relative navigation
                    if (href === '/') {
                        link.href = '../';
                    } else if (href.startsWith('/')) {
                        // Convert absolute paths to relative paths for subdirectories
                        link.href = '..' + href;
                    }
                } else {
                    // Keep absolute paths as is for root page
                    link.href = href;
                }
            }
        });

        // Set active states based on current page
        this.setActiveStates();
    }

    createInlineNavigation() {
        console.log('Creating inline navigation for localhost');
        
        // Create a simple inline navigation
        const navHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="logo">
                        <a href="${window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') ? '../' : '/'}" class="logo-link">
                            <img src="${window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') ? '../logo-test.png' : 'logo-test.png'}" alt="Le Chat Noir Logo" class="logo-image">
                        </a>
                    </div>
                    <div class="nav-links">
                        <a href="${window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') ? '../' : '/'}" class="nav-link">Home</a>
                        <a href="${window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') ? '../career-objective' : '/career-objective'}" class="nav-link">Career Objective</a>
                        <a href="${window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') ? '../personal-management' : '/personal-management'}" class="nav-link">Personal Management</a>
                        <a href="${window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') ? '../work-history' : '/work-history'}" class="nav-link">Work History</a>
                        <a href="${window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') ? '../career-skills' : '/career-skills'}" class="nav-link">Career Skills</a>
                        <a href="${window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') ? '../awards-achievements' : '/awards-achievements'}" class="nav-link">Awards</a>
                    </div>
                </div>
            </nav>
        `;
        
        // Inject the navigation
        const placeholder = document.querySelector('#navbar-placeholder');
        if (placeholder) {
            placeholder.outerHTML = navHTML;
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHTML);
        }
        
        // Load navbar CSS
        this.loadInlineNavbarCSS();
        
        this.loaded = true;
    }
    
    loadInlineNavbarCSS() {
        if (document.querySelector('#navbar-styles')) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'navbar-styles';
        styleElement.textContent = `
            .navbar {
                position: fixed;
                top: 0;
                width: 100%;
                background-color: rgba(51, 58, 87, 0.95);
                padding: 0.5rem 0;
                transition: all 0.3s ease;
                z-index: 1000;
                backdrop-filter: blur(10px);
            }
            .nav-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            .logo-link {
                display: block;
                text-decoration: none;
            }
            .logo-image {
                height: 50px;
                width: auto;
                transition: all 0.3s ease;
            }
            .nav-links {
                display: flex;
                gap: 2rem;
            }
            .nav-link {
                color: #fff;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            .nav-link:hover {
                color: #4D869B;
            }
        `;
        document.head.appendChild(styleElement);
    }

    setActiveStates() {
        const currentPath = window.location.pathname;
        
        console.log('Setting active states for path:', currentPath);
        
        // Remove all active classes first
        document.querySelectorAll('.nav-link, .mobile-nav-link, .submenu-bubble-item').forEach(link => {
            link.classList.remove('active');
        });
        
        // Remove active states from mobile navigation items
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        console.log('Found mobile nav items:', mobileNavItems.length);
        
        // If no mobile nav items found, the navigation might not be loaded yet
        if (mobileNavItems.length === 0) {
            console.log('No mobile nav items found, navigation might not be loaded yet');
            return;
        }

        // Set active state based on current page - only highlight the exact current page
        if (currentPath.includes('personal-management/index.html')) {
            const personalManagementLinks = document.querySelectorAll('a[href*="personal-management/index.html"]');
            personalManagementLinks.forEach(link => {
                link.classList.add('active');
            });
            // Set mobile navigation active state for profile section
            const profileItem = document.querySelector('[data-section="profile"]');
            if (profileItem) {
                profileItem.classList.add('active');
                
                // Also highlight the Personal Management link in the submenu
                const personalManagementSubmenuLink = profileItem.querySelector('a[href*="personal-management/index.html"]');
                if (personalManagementSubmenuLink) {
                    personalManagementSubmenuLink.classList.add('active');
                }
            }
        } else if (currentPath.includes('career-objective/index.html')) {
            const careerObjectiveLinks = document.querySelectorAll('a[href*="career-objective/index.html"]');
            careerObjectiveLinks.forEach(link => {
                link.classList.add('active');
            });
            console.log('Found career objective links:', careerObjectiveLinks.length);
            
            // Set mobile navigation active state for profile section
            const profileItem = document.querySelector('[data-section="profile"]');
            console.log('Profile item found:', !!profileItem);
            if (profileItem) {
                profileItem.classList.add('active');
                console.log('Added active class to profile item');
                
                // Also highlight the Career Objective link in the submenu
                const careerObjectiveSubmenuLink = profileItem.querySelector('a[href*="career-objective/index.html"]');
                console.log('Career Objective submenu link found:', !!careerObjectiveSubmenuLink);
                if (careerObjectiveSubmenuLink) {
                    careerObjectiveSubmenuLink.classList.add('active');
                    console.log('Added active class to Career Objective submenu link');
                } else {
                    console.log('No Career Objective submenu link found in profile item');
                    console.log('Profile item children:', profileItem.children);
                    console.log('Profile item HTML:', profileItem.innerHTML);
                }
            } else {
                console.log('Profile item not found, searching for data-section="profile"');
                console.log('All mobile nav items:', document.querySelectorAll('.mobile-nav-item'));
            }
        } else if (currentPath.includes('work-history/index.html')) {
            const workHistoryLinks = document.querySelectorAll('a[href*="work-history/index.html"]');
            workHistoryLinks.forEach(link => {
                link.classList.add('active');
            });
            // Set mobile navigation active state for experience section
            const experienceItem = document.querySelector('[data-section="experience"]');
            if (experienceItem) {
                experienceItem.classList.add('active');
                
                // Also highlight the Work History link in the submenu
                const workHistorySubmenuLink = experienceItem.querySelector('a[href*="work-history/index.html"]');
                if (workHistorySubmenuLink) {
                    workHistorySubmenuLink.classList.add('active');
                }
            }
        } else if (currentPath === '/' || currentPath === '/index.html') {
            // Home page - set mobile navigation active state for home section
            const homeItem = document.querySelector('[data-section="home"]');
            if (homeItem) homeItem.classList.add('active');
        }
        
        // Set active states for submenu bubble items
        const allSubmenuItems = document.querySelectorAll('.submenu-bubble-item');
        allSubmenuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && !href.startsWith('#')) {
                // Check if this link matches the current page exactly
                const isCurrentPage = (currentPath.includes('personal-management/index.html') && href.includes('personal-management/index.html')) ||
                                    (currentPath.includes('career-objective/index.html') && href.includes('career-objective/index.html')) ||
                                    (currentPath.includes('work-history/index.html') && href.includes('work-history/index.html'));
                
                if (isCurrentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navLoader = new NavigationLoader();
    navLoader.initialize().catch(error => {
        // Failed to initialize NavigationLoader
    });
});

// Also try to initialize if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const navLoader = new NavigationLoader();
        navLoader.initialize().catch(error => {
            // Failed to initialize NavigationLoader
        });
    });
} else {
    const navLoader = new NavigationLoader();
    navLoader.initialize().catch(error => {
        // Failed to initialize NavigationLoader
    });
}

// Export for manual use if needed
window.NavigationLoader = NavigationLoader;

// Also export a global function for debugging
window.debugNavigation = () => {
    console.log('Debugging navigation...');
    console.log('Current path:', window.location.pathname);
    console.log('Mobile nav items:', document.querySelectorAll('.mobile-nav-item'));
    console.log('Profile section:', document.querySelector('[data-section="profile"]'));
    console.log('Active classes:', document.querySelectorAll('.mobile-nav-item.active'));
};
