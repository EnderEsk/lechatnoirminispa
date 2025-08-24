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
            const isRoot = currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/');
            const isSubdirectory = currentPath.includes('/') && !currentPath.endsWith('/') && !currentPath.endsWith('index.html');
            const basePath = isSubdirectory ? '../components/' : 'components/';
            

            
            // Load HTML component
            const htmlResponse = await fetch(basePath + 'navbar.html');
            this.navbarHTML = await htmlResponse.text();

            // Load CSS component
            const cssResponse = await fetch(basePath + 'navbar.css');
            this.navbarCSS = await cssResponse.text();

            // Load JS component
            const jsResponse = await fetch(basePath + 'navbar.js');
            this.navbarJS = await jsResponse.text();

            this.loaded = true;
        } catch (error) {
            // Error loading navigation components
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
        
        // Update paths based on current page location
        this.updatePaths();
    }

    updatePaths() {
        const currentPath = window.location.pathname;
        const isRoot = currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/');
        const isSubdirectory = currentPath.includes('/') && !currentPath.endsWith('/') && !currentPath.endsWith('index.html');
        

        
        // Update logo links
        const logoLinks = document.querySelectorAll('.logo-link, .center-logo-link');
        logoLinks.forEach(link => {
            if (isSubdirectory) {
                link.href = '../index.html';
            } else {
                link.href = 'index.html';
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
                    // Add parent directory for subpages
                    if (href.startsWith('career-objective/') || href.startsWith('personal-management/') || href.startsWith('work-history/')) {
                        link.href = '../' + href;
                    } else if (href === 'index.html') {
                        link.href = '../index.html';
                    } else {
                        link.href = href;
                    }
                } else {
                    // Keep relative paths as is for root page
                    link.href = href;
                }
            }
        });

        // Set active states based on current page
        this.setActiveStates();
    }

    setActiveStates() {
        const currentPath = window.location.pathname;
        
        // Remove all active classes first
        document.querySelectorAll('.nav-link, .mobile-nav-link, .submenu-bubble-item').forEach(link => {
            link.classList.remove('active');
        });

        // Set active state based on current page - only highlight the exact current page
        if (currentPath.includes('personal-management/index.html')) {
            const personalManagementLinks = document.querySelectorAll('a[href*="personal-management/index.html"]');
            personalManagementLinks.forEach(link => {
                link.classList.add('active');
            });
        } else if (currentPath.includes('career-objective/index.html')) {
            const careerObjectiveLinks = document.querySelectorAll('a[href*="career-objective/index.html"]');
            careerObjectiveLinks.forEach(link => {
                link.classList.add('active');
            });
        } else if (currentPath.includes('work-history/index.html')) {
            const workHistoryLinks = document.querySelectorAll('a[href*="work-history/index.html"]');
            workHistoryLinks.forEach(link => {
                link.classList.add('active');
            });
        } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
            // Home page - no specific links to highlight
        }
        
        // Remove active states from submenu items that don't match the current page
        const allSubmenuItems = document.querySelectorAll('.submenu-bubble-item');
        allSubmenuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && !href.startsWith('#')) {
                // Check if this link matches the current page exactly
                const isCurrentPage = (currentPath.includes('personal-management/index.html') && href.includes('personal-management/index.html')) ||
                                    (currentPath.includes('career-objective/index.html') && href.includes('career-objective/index.html')) ||
                                    (currentPath.includes('work-history/index.html') && href.includes('work-history/index.html'));
                
                if (!isCurrentPage) {
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
