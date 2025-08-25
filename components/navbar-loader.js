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
            // Universal path detection that works across all platforms and protocols
            const basePath = this.getBasePath();
            
            console.log('Navigation path detection:', {
                currentPath: window.location.pathname,
                protocol: window.location.protocol,
                hostname: window.location.hostname,
                basePath: basePath
            });
            
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
            console.log('Falling back to inline navigation...');
            this.createInlineNavigation();
        }
    }

    getBasePath() {
        // Simple, universal path detection that works across all platforms
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment !== '');
        
        // If we're in a subdirectory (not root), go up one level to find components
        if (pathSegments.length > 1) {
            return '../components/';
        } else {
            return 'components/';
        }
    }

    processNavbarHTML(html, basePath) {
        let processedHtml = html;
        const isSubdirectory = basePath === '../components/';
        
        if (isSubdirectory) {
            // Fix logo image path
            processedHtml = processedHtml.replace('src="logo-test.png"', 'src="../logo-test.png"');
            
            // Fix navigation links to use relative paths
            processedHtml = processedHtml.replace(/href="\//g, 'href="../');
            
            // Fix home link specifically
            processedHtml = processedHtml.replace('href="../"', 'href="../');
        }
        
        return processedHtml;
    }

    processNavbarCSS(css, basePath) {
        let processedCSS = css;
        const isSubdirectory = basePath === '../components/';
        
        if (isSubdirectory) {
            // Fix any image paths that might be relative
            processedCSS = processedCSS.replace(/url\(['"]?([^'")\s]+)['"]?\)/g, (match, url) => {
                // Skip data URLs and absolute URLs
                if (url.startsWith('data:') || url.startsWith('http') || url.startsWith('/')) {
                    return match;
                }
                // Make relative paths go up one level
                return `url("../${url}")`;
            });
        }
        
        return processedCSS;
    }

    injectNavigation() {
        if (!this.loaded) {
            return;
        }

        // Process the HTML to fix paths for subdirectories
        const processedHTML = this.processNavbarHTML(this.navbarHTML, this.getBasePath());
        
        // Process the CSS to fix any relative paths for subdirectories
        const processedCSS = this.processNavbarCSS(this.navbarCSS, this.getBasePath());

        // Inject CSS
        if (!document.querySelector('#navbar-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'navbar-styles';
            styleElement.textContent = processedCSS;
            document.head.appendChild(styleElement);
        }

        // Inject HTML - replace the placeholder div
        const placeholder = document.querySelector('#navbar-placeholder');
        if (placeholder) {
            placeholder.outerHTML = processedHTML;
        } else {
            // Fallback: insert at the beginning of body if no placeholder exists
            document.body.insertAdjacentHTML('afterbegin', processedHTML);
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
            this.updatePaths();
        }, 200);
        
        // Also try to set active states after a longer delay as a fallback
        setTimeout(() => {
            console.log('Fallback: Setting active states after longer delay');
            this.setActiveStates();
        }, 1000);
    }

    updatePaths() {
        const basePath = this.getBasePath();
        const isSubdirectory = basePath === '../components/';
        
        // Update logo links
        const logoLinks = document.querySelectorAll('.logo-link, .center-logo-link');
        logoLinks.forEach(link => {
            link.href = isSubdirectory ? '../' : '/';
        });

        // Update logo image sources
        const logoImages = document.querySelectorAll('.logo-image, .center-logo-image');
        logoImages.forEach(img => {
            img.src = isSubdirectory ? '../logo-test.png' : 'logo-test.png';
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
        console.log('Creating inline navigation');
        
        const basePath = this.getBasePath();
        const isSubdirectory = basePath === '../components/';
        const pathPrefix = isSubdirectory ? '../' : '/';
        const logoPath = isSubdirectory ? '../logo-test.png' : 'logo-test.png';
        
        // Create a full inline navigation that matches the original structure
        const navHTML = `
            <nav class="navbar" id="navbar">
                <div class="nav-container">
                    <div class="logo">
                        <a href="${pathPrefix}" class="logo-link">
                            <img src="${logoPath}" alt="Le Chat Noir Logo" class="logo-image">
                        </a>
                    </div>
                    
                    <!-- Desktop Navigation -->
                    <div class="links">
                        <div class="nav-group">
                            <span class="group-title">Profile</span>
                            <div class="nav-links-container">
                                <a href="${pathPrefix}career-objective" class="nav-link">Career Objective</a>
                                <a href="${pathPrefix}personal-management" class="nav-link">Personal Management</a>
                            </div>
                        </div>
                        
                        <div class="nav-group">
                            <span class="group-title">Experience</span>
                            <div class="nav-links-container">
                                <a href="${pathPrefix}work-history" class="nav-link">Work History</a>
                                <a href="${pathPrefix}career-skills" class="nav-link">Career Skills</a>
                            </div>
                        </div>
                        
                        <div class="nav-group">
                            <span class="group-title">Recognition</span>
                            <div class="nav-links-container">
                                <a href="${pathPrefix}awards-achievements" class="nav-link">Awards & Achievements</a>
                            </div>
                        </div>
                        
                        <div class="nav-group">
                            <span class="group-title">Documents</span>
                            <div class="nav-links-container">
                                <a href="#cover-letter" class="nav-link">Cover Letter</a>
                                <a href="#resume" class="nav-link">Resume</a>
                                <a href="#references" class="nav-link">References</a>
                                <a href="#portfolio" class="nav-link">Portfolio</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mobile Menu Toggle -->
                    <button class="mobile-menu-toggle" id="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            <!-- Mobile Menu Overlay -->
            <div class="mobile-menu-overlay" id="mobile-menu-overlay">
                <button class="mobile-menu-close" id="mobile-menu-close">&times;</button>
                <div class="mobile-menu-content">
                    <div class="mobile-nav-links">
                        <div class="mobile-nav-group">
                            <span class="mobile-group-title" data-group="profile">Profile</span>
                            <div class="mobile-nav-links-container" id="profile-links">
                                <a href="${pathPrefix}career-objective" class="mobile-nav-link">Career Objective</a>
                                <a href="${pathPrefix}personal-management" class="mobile-nav-link">Personal Management</a>
                            </div>
                        </div>
                        
                        <div class="mobile-nav-group">
                            <span class="mobile-group-title" data-group="experience">Experience</span>
                            <div class="mobile-nav-links-container" id="experience-links">
                                <a href="${pathPrefix}work-history" class="mobile-nav-link">Work History</a>
                                <a href="${pathPrefix}career-skills" class="mobile-nav-link">Career Skills</a>
                            </div>
                        </div>
                        
                        <div class="mobile-nav-group">
                            <span class="mobile-group-title" data-group="recognition">Recognition</span>
                            <div class="mobile-nav-links-container" id="recognition-links">
                                <a href="${pathPrefix}awards-achievements" class="mobile-nav-link">Awards & Achievements</a>
                            </div>
                        </div>
                        
                        <div class="mobile-nav-group">
                            <span class="mobile-group-title" data-group="documents">Documents</span>
                            <div class="mobile-nav-links-container" id="documents-links">
                                <a href="#cover-letter" class="mobile-nav-link">Cover Letter</a>
                                <a href="#resume" class="mobile-nav-link">Resume</a>
                                <a href="#references" class="mobile-nav-link">References</a>
                                <a href="#portfolio" class="mobile-nav-link">Portfolio</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile Bottom Navigation Bar -->
            <div class="mobile-bottom-nav" id="mobile-bottom-nav">
                <div class="mobile-bottom-nav-container">
                    <div class="mobile-nav-item" data-section="profile">
                        <div class="mobile-nav-icon icon-profile"></div>
                        <span class="mobile-nav-text">Profile</span>
                        <div class="submenu-bubble" id="profile-submenu">
                            <a href="${pathPrefix}career-objective" class="submenu-bubble-item">Career Objective</a>
                            <a href="${pathPrefix}personal-management" class="submenu-bubble-item">Personal Management</a>
                        </div>
                    </div>
                    
                    <div class="mobile-nav-item" data-section="experience">
                        <div class="mobile-nav-icon icon-experience"></div>
                        <span class="mobile-nav-text">Experience</span>
                        <div class="submenu-bubble" id="experience-submenu">
                            <a href="${pathPrefix}work-history" class="submenu-bubble-item">Work History</a>
                            <a href="${pathPrefix}career-skills" class="submenu-bubble-item">Career Skills</a>
                        </div>
                    </div>
                    
                    <div class="mobile-nav-item center-item" data-section="home">
                        <a href="${pathPrefix}" class="center-logo-link">
                            <img src="${logoPath}" alt="Le Chat Noir Logo" class="center-logo-image">
                        </a>
                    </div>
                    
                    <div class="mobile-nav-item" data-section="recognition">
                        <div class="mobile-nav-icon icon-recognition"></div>
                        <span class="mobile-nav-text">Recognition</span>
                        <div class="submenu-bubble" id="recognition-submenu">
                            <a href="${pathPrefix}awards-achievements" class="submenu-bubble-item">Awards & Achievements</a>
                        </div>
                    </div>
                    
                    <div class="mobile-nav-item" data-section="documents">
                        <div class="mobile-nav-icon icon-documents"></div>
                        <span class="mobile-nav-text">Documents</span>
                        <div class="submenu-bubble" id="documents-submenu">
                            <a href="#cover-letter" class="submenu-bubble-item">Cover Letter</a>
                            <a href="#resume" class="submenu-bubble-item">Resume</a>
                            <a href="#references" class="submenu-bubble-item">References</a>
                            <a href="#portfolio" class="submenu-bubble-item">Portfolio</a>
                        </div>
                    </div>
                </div>
                <div class="home-indicator"></div>
            </div>
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
        
        // Load navbar JavaScript functionality
        this.loadInlineNavbarJS();
        
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
            .logo-image:hover {
                transform: scale(1.05);
                filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
            }
            
            /* Desktop Navigation */
            .links {
                display: flex;
                gap: 2rem;
                align-items: center;
            }
            .nav-group {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .group-title {
                color: #9CA3AF;
                font-size: 0.75rem;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 0.5rem;
            }
            .nav-links-container {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                align-items: center;
            }
            .nav-link {
                color: #fff;
                text-decoration: none;
                font-weight: 500;
                font-size: 0.875rem;
                transition: all 0.3s ease;
                padding: 0.25rem 0.5rem;
                border-radius: 0.375rem;
                white-space: nowrap;
            }
            .nav-link:hover {
                color: #4D869B;
                background-color: rgba(77, 134, 155, 0.1);
            }
            .nav-link.active {
                color: #4D869B;
                background-color: rgba(77, 134, 155, 0.2);
            }
            
            /* Mobile Menu Toggle */
            .mobile-menu-toggle {
                display: none;
                flex-direction: column;
                justify-content: space-around;
                width: 30px;
                height: 25px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0;
                z-index: 10;
            }
            .mobile-menu-toggle span {
                width: 100%;
                height: 3px;
                background: #fff;
                border-radius: 10px;
                transition: all 0.3s ease;
            }
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            /* Mobile Menu Overlay */
            .mobile-menu-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(51, 58, 87, 0.98);
                z-index: 999;
                backdrop-filter: blur(10px);
            }
            .mobile-menu-overlay.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .mobile-menu-close {
                position: absolute;
                top: 2rem;
                right: 2rem;
                background: none;
                border: none;
                color: #fff;
                font-size: 2rem;
                cursor: pointer;
                z-index: 1000;
            }
            .mobile-menu-content {
                text-align: center;
                color: #fff;
            }
            .mobile-nav-links {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }
            .mobile-nav-group {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .mobile-group-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: #9CA3AF;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 0.5rem;
                transition: all 0.3s ease;
            }
            .mobile-group-title:hover {
                background-color: rgba(77, 134, 155, 0.1);
                color: #fff;
            }
            .mobile-nav-links-container {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding-left: 1rem;
            }
            .mobile-nav-link {
                color: #fff;
                text-decoration: none;
                font-weight: 500;
                padding: 0.5rem;
                border-radius: 0.375rem;
                transition: all 0.3s ease;
            }
            .mobile-nav-link:hover {
                background-color: rgba(77, 134, 155, 0.1);
                color: #4D869B;
            }
            .mobile-nav-link.active {
                background-color: rgba(77, 134, 155, 0.2);
                color: #4D869B;
            }
            
            /* Mobile Bottom Navigation */
            .mobile-bottom-nav {
                display: none;
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: rgba(51, 58, 87, 0.98);
                backdrop-filter: blur(10px);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 1000;
                padding: 8px 0 20px 0;
            }
            .mobile-bottom-nav-container {
                display: flex;
                justify-content: space-around;
                align-items: center;
                max-width: 400px;
                margin: 0 auto;
                padding: 0 20px;
            }
            .mobile-nav-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                cursor: pointer;
                transition: all 0.3s ease;
                padding: 8px 12px;
                border-radius: 12px;
                min-width: 60px;
                position: relative;
            }
            .mobile-nav-item.active {
                transform: translateY(-4px);
            }
            .mobile-nav-item:not(.center-item):hover {
                background: rgba(77, 134, 155, 0.1);
            }
            .mobile-nav-icon {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #9CA3AF;
                transition: all 0.3s ease;
            }
            .icon-profile::before {
                content: "👤";
                font-size: 20px;
            }
            .icon-experience::before {
                content: "💼";
                font-size: 20px;
            }
            .icon-recognition::before {
                content: "🏆";
                font-size: 20px;
            }
            .icon-documents::before {
                content: "📄";
                font-size: 20px;
            }
            .mobile-nav-item.active .mobile-nav-icon {
                color: #4D869B;
            }
            .mobile-nav-text {
                font-size: 0.75rem;
                color: #9CA3AF;
                font-weight: 500;
                text-align: center;
                transition: all 0.3s ease;
            }
            .mobile-nav-item.active .mobile-nav-text {
                color: #4D869B;
            }
            .center-item {
                transform: translateY(-8px);
            }
            .center-logo-link {
                display: block;
                text-decoration: none;
            }
            .center-logo-image {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            .center-logo-image:hover {
                transform: scale(1.1);
                filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5));
            }
            
            /* Submenu Bubbles */
            .submenu-bubble {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(51, 58, 87, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                display: none;
                flex-direction: column;
                gap: 0.5rem;
                min-width: 140px;
                z-index: 1001;
            }
            .mobile-nav-item:hover .submenu-bubble {
                display: flex;
            }
            .submenu-bubble-item {
                color: #fff;
                text-decoration: none;
                font-size: 0.875rem;
                font-weight: 500;
                padding: 0.5rem;
                border-radius: 0.375rem;
                transition: all 0.3s ease;
                text-align: center;
                white-space: nowrap;
            }
            .submenu-bubble-item:hover {
                background-color: rgba(77, 134, 155, 0.1);
                color: #4D869B;
            }
            .submenu-bubble-item.active {
                background-color: rgba(77, 134, 155, 0.2);
                color: #4D869B;
            }
            
            /* Home Indicator */
            .home-indicator {
                position: absolute;
                bottom: 8px;
                left: 50%;
                transform: translateX(-50%);
                width: 134px;
                height: 5px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 3px;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .links {
                    display: none;
                }
                .mobile-menu-toggle {
                    display: flex;
                }
                .mobile-bottom-nav {
                    display: block;
                }
            }
            
            @media (min-width: 769px) {
                .mobile-bottom-nav {
                    display: none;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    loadInlineNavbarJS() {
        if (document.querySelector('#navbar-script')) return;
        
        const scriptElement = document.createElement('script');
        scriptElement.id = 'navbar-script';
        scriptElement.textContent = `
            // Mobile Menu Toggle Functionality
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            const mobileMenuClose = document.getElementById('mobile-menu-close');
            
            if (mobileMenuToggle && mobileMenuOverlay && mobileMenuClose) {
                mobileMenuToggle.addEventListener('click', () => {
                    mobileMenuOverlay.classList.add('active');
                    mobileMenuToggle.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });

                mobileMenuClose.addEventListener('click', () => {
                    mobileMenuOverlay.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });

                // Close mobile menu when clicking outside
                mobileMenuOverlay.addEventListener('click', (e) => {
                    if (e.target === mobileMenuOverlay) {
                        mobileMenuOverlay.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
            
            // Mobile Group Title Toggle Functionality
            const mobileGroupTitles = document.querySelectorAll('.mobile-group-title');
            mobileGroupTitles.forEach(title => {
                title.addEventListener('click', () => {
                    const group = title.closest('.mobile-nav-group');
                    const linksContainer = group.querySelector('.mobile-nav-links-container');
                    
                    if (linksContainer) {
                        const isExpanded = linksContainer.style.display === 'flex';
                        linksContainer.style.display = isExpanded ? 'none' : 'flex';
                    }
                });
            });
            
            // Set active states for current page
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .submenu-bubble-item');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#')) {
                    if (currentPath.includes('career-skills') && href.includes('career-skills')) {
                        link.classList.add('active');
                    } else if (currentPath.includes('career-objective') && href.includes('career-objective')) {
                        link.classList.add('active');
                    } else if (currentPath.includes('personal-management') && href.includes('personal-management')) {
                        link.classList.add('active');
                    } else if (currentPath.includes('work-history') && href.includes('work-history')) {
                        link.classList.add('active');
                    } else if (currentPath.includes('awards-achievements') && href.includes('awards-achievements')) {
                        link.classList.add('active');
                    }
                }
            });
            
            // Set mobile navigation active states
            if (currentPath.includes('career-skills') || currentPath.includes('work-history')) {
                const experienceItem = document.querySelector('[data-section="experience"]');
                if (experienceItem) experienceItem.classList.add('active');
            } else if (currentPath.includes('career-objective') || currentPath.includes('personal-management')) {
                const profileItem = document.querySelector('[data-section="profile"]');
                if (profileItem) profileItem.classList.add('active');
            } else if (currentPath.includes('awards-achievements')) {
                const recognitionItem = document.querySelector('[data-section="recognition"]');
                if (recognitionItem) recognitionItem.classList.add('active');
            }
        `;
        document.body.appendChild(scriptElement);
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
