// Career Skills Page JavaScript
// Handles interactive skill wheel functionality and animations

// Navigation functionality
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navGroups = document.querySelectorAll('.nav-group');
    const mobileBottomNav = document.getElementById('mobile-bottom-nav');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const submenuBubbles = document.querySelectorAll('.submenu-bubble');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileGroupTitles = document.querySelectorAll('.mobile-group-title');

    console.log('DOM elements found:', {
        navbar: !!navbar,
        navLinks: navLinks.length,
        navGroups: navGroups.length,
        mobileBottomNav: !!mobileBottomNav,
        mobileNavItems: mobileNavItems.length
    });

    if (!navbar) {
        console.error('Navbar element not found!');
        return;
    }

    // Navbar transparency on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(51, 58, 87, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(51, 58, 87, 0.85)';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Allow external links to work normally
            if (href.startsWith('http') || href.startsWith('career-objective/') || href.startsWith('./career-objective/') || 
                href.startsWith('personal-management/') || href.startsWith('./personal-management/') ||
                href.startsWith('work-history/') || href.startsWith('./work-history/') ||
                href.startsWith('career-skills/') || href.startsWith('./career-skills/') ||
                href.startsWith('awards-achievements/') || href.startsWith('./awards-achievements/')) {
                return; // Don't prevent default, let the link work normally
            }
            
            // Only handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile Menu Toggle Functionality
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
    mobileGroupTitles.forEach(title => {
        title.addEventListener('click', () => {
            const group = title.closest('.mobile-nav-group');
            const linksContainer = group.querySelector('.mobile-nav-links-container');
            
            // Close all other groups
            mobileGroupTitles.forEach(otherTitle => {
                if (otherTitle !== title) {
                    const otherGroup = otherTitle.closest('.mobile-nav-group');
                    const otherLinksContainer = otherGroup.querySelector('.mobile-nav-links-container');
                    otherTitle.classList.remove('active');
                    otherLinksContainer.classList.remove('active');
                }
            });
            
            // Toggle current group
            title.classList.toggle('active');
            linksContainer.classList.toggle('active');
        });
    });

    // Mobile Bottom Navigation Functionality
    if (mobileBottomNav && mobileNavItems.length > 0) {
        // Set initial active states for mobile navigation based on current page
        function setMobileNavActiveStates() {
            const currentPath = window.location.pathname;
            
            // Remove all active states first
            mobileNavItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Set active state based on current page
            if (currentPath.includes('personal-management/index.html')) {
                const profileItem = document.querySelector('[data-section="profile"]');
                if (profileItem) profileItem.classList.add('active');
            } else if (currentPath.includes('career-objective/index.html')) {
                const profileItem = document.querySelector('[data-section="profile"]');
                if (profileItem) profileItem.classList.add('active');
            } else if (currentPath.includes('work-history/index.html')) {
                const experienceItem = document.querySelector('[data-section="experience"]');
                if (experienceItem) experienceItem.classList.add('active');
            } else if (currentPath.includes('career-skills/index.html')) {
                const experienceItem = document.querySelector('[data-section="experience"]');
                if (experienceItem) experienceItem.classList.add('active');
            } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
                const homeItem = document.querySelector('[data-section="home"]');
                if (homeItem) homeItem.classList.add('active');
            }
        }
        
        // Function to close all submenu bubbles
        function closeAllSubmenus() {
            submenuBubbles.forEach(bubble => {
                bubble.classList.remove('active');
            });
            
            // Also remove active states from mobile nav items (except for current page)
            mobileNavItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Restore the correct active state based on current page
            setMobileNavActiveStates();
        }

        // Function to position submenu bubble as a speech bubble above the pressed item
        function positionSubmenuBubble(bubble, navItem) {
            const rect = navItem.getBoundingClientRect();
            const bubbleWidth = bubble.offsetWidth;
            const viewportWidth = window.innerWidth;
            
            // Calculate the center position of the nav item
            let left = rect.left + (rect.width / 2) - (bubbleWidth / 2);
            
            // Ensure the bubble doesn't go off-screen
            if (left < 10) {
                left = 10;
            } else if (left + bubbleWidth > viewportWidth - 10) {
                left = viewportWidth - bubbleWidth - 10;
            }
            
            // Position the bubble above the nav item with proper spacing
            bubble.style.left = left + 'px';
            bubble.style.bottom = '80px';
            
            // Update the speech bubble tail position to point to the nav item
            const tail = bubble.querySelector('.submenu-bubble::after') || bubble;
            const itemCenter = rect.left + (rect.width / 2);
            const bubbleLeft = parseFloat(bubble.style.left);
            const tailOffset = itemCenter - bubbleLeft;
            
            // Update the tail position to point to the nav item
            bubble.style.setProperty('--tail-offset', `${tailOffset}px`);
            
            console.log('Speech bubble positioned:', { 
                left, 
                bottom: '80px',
                itemCenter,
                bubbleLeft,
                tailOffset,
                itemLeft: rect.left,
                itemWidth: rect.width,
                bubbleWidth
            });
        }

        // Add click event listeners to mobile nav items
        mobileNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                console.log('Mobile nav item clicked:', item.getAttribute('data-section'));
                
                // Find corresponding submenu bubble by ID
                const section = item.getAttribute('data-section');
                const bubbleId = `${section}-submenu`;
                const bubble = document.getElementById(bubbleId);
                
                console.log('Looking for bubble with ID:', bubbleId);
                console.log('Bubble found:', !!bubble);
                console.log('Bubble element:', bubble);
                
                if (bubble && bubble.classList.contains('submenu-bubble')) {
                    // Toggle current submenu
                    if (bubble.classList.contains('active')) {
                        // Close this submenu
                        bubble.classList.remove('active');
                        item.classList.remove('active');
                        console.log('Submenu closed');
                    } else {
                        // Close all other submenus first, then open this one
                        closeAllSubmenus();
                        bubble.classList.add('active');
                        item.classList.add('active');
                        positionSubmenuBubble(bubble, item);
                        console.log('Submenu opened and positioned');
                    }
                } else {
                    console.log('Bubble not found or not a submenu bubble');
                    console.log('Available submenu bubbles:', document.querySelectorAll('.submenu-bubble').length);
                }
            });
        });

        // Close submenus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.mobile-nav-item')) {
                closeAllSubmenus();
            }
        });

        // Handle submenu bubble clicks
        submenuBubbles.forEach(bubble => {
            bubble.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

        // Close submenus when window resizes
        window.addEventListener('resize', () => {
            // Close all submenus on resize
            closeAllSubmenus();
        });

        // Call initial active state setting
        setMobileNavActiveStates();
        
        // Update active states based on scroll position
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            // Remove active states from all mobile nav items
            mobileNavItems.forEach(item => {
                // Only remove active state if it's not from an open submenu
                if (!item.querySelector('.submenu-bubble.active')) {
                    item.classList.remove('active');
                }
            });
            
            // Set home as active only when at the very top
            if (scrollPosition < 50) {
                const homeItem = document.querySelector('[data-section="home"]');
                if (homeItem) homeItem.classList.add('active');
            }
        });
    }

    // Desktop Dropdown Functionality
    if (navGroups.length > 0) {
        // Handle clicks on navigation group titles
        navGroups.forEach(group => {
            const groupTitle = group.querySelector('.group-title');
            
            groupTitle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns
                navGroups.forEach(otherGroup => {
                    if (otherGroup !== group) {
                        otherGroup.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                group.classList.toggle('active');
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-group')) {
                navGroups.forEach(group => {
                    group.classList.remove('active');
                });
            }
        });
        
        // Close dropdowns when clicking on navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navGroups.forEach(group => {
                    group.classList.remove('active');
                });
            });
        });
    }

    console.log('Navigation initialization complete!');
}

// URL Cleaning Function - Prevents index.html from being appended to URLs
function cleanURLs() {
    // Get current URL
    const currentURL = window.location.href;
    
    // Check if we're on a page with index.html in the URL
    if (currentURL.includes('/index.html')) {
        // Remove index.html from the URL
        const cleanURL = currentURL.replace('/index.html', '');
        
        // Update browser history without reloading the page
        window.history.replaceState({}, document.title, cleanURL);
        
        console.log('Cleaned URL from:', currentURL, 'to:', cleanURL);
    }
}

// Clean URLs when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Clean URLs
    cleanURLs();
});

// Also clean URLs when navigating (for single-page app behavior)
window.addEventListener('popstate', cleanURLs);

// Intercept navigation clicks to prevent index.html from being added
document.addEventListener('click', function(event) {
    // Check if the clicked element is a navigation link
    if (event.target.tagName === 'A' && event.target.href) {
        const href = event.target.href;
        
        // If the link would result in index.html being added, prevent it
        if (href.includes('/index.html')) {
            event.preventDefault();
            
            // Navigate to the clean URL instead
            const cleanHref = href.replace('/index.html', '');
            window.location.href = cleanHref;
        }
    }
});

class SkillsWheel {
    constructor() {
        this.wheel = document.querySelector('.skills-wheel');
        this.segments = document.querySelectorAll('.skill-segment');
        this.hub = document.querySelector('.wheel-hub');
        this.flowArrows = document.querySelectorAll('.flow-arrow');
        this.isAnimating = false;
        this.currentRotation = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupIntersectionObserver();
    }
    
    setupEventListeners() {
        // Pause wheel rotation on hover
        if (this.wheel) {
            this.wheel.addEventListener('mouseenter', () => this.pauseRotation());
            this.wheel.addEventListener('mouseleave', () => this.resumeRotation());
        }
        
        // Add click events to skill segments
        this.segments.forEach(segment => {
            segment.addEventListener('click', (e) => this.handleSegmentClick(e, segment));
            segment.addEventListener('mouseenter', (e) => this.handleSegmentHover(e, segment));
            segment.addEventListener('mouseleave', (e) => this.handleSegmentLeave(e, segment));
        });
        
        // Add touch events for mobile
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.wheel?.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        this.wheel?.addEventListener('touchmove', (e) => {
            if (!this.isAnimating) {
                e.preventDefault();
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;
                
                const deltaX = touchX - touchStartX;
                const deltaY = touchY - touchStartY;
                
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                    this.manualRotate(deltaX);
                }
            }
        });
    }
    
    handleSegmentClick(e, segment) {
        e.preventDefault();
        
        // Add click animation
        segment.style.transform += ' scale(0.95)';
        setTimeout(() => {
            segment.style.transform = segment.style.transform.replace(' scale(0.95)', '');
        }, 150);
        
        // Show skill details with enhanced animation
        this.showSkillDetails(segment);
    }
    
    handleSegmentHover(e, segment) {
        // Add hover glow effect
        segment.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(167, 139, 250, 0.6))';
        
        // Slightly pause rotation for better interaction
        this.slowRotation();
    }
    
    handleSegmentLeave(e, segment) {
        // Remove hover effects
        segment.style.filter = '';
        
        // Resume normal rotation
        this.resumeRotation();
    }
    
    showSkillDetails(segment) {
        const details = segment.querySelector('.skill-details');
        if (details) {
            // Enhanced animation for skill details
            details.style.animation = 'skillDetailsShow 0.5s ease-out forwards';
            
            // Add a subtle bounce effect
            setTimeout(() => {
                details.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    details.style.transform = 'scale(1)';
                }, 100);
            }, 250);
        }
    }
    
    pauseRotation() {
        if (this.wheel) {
            this.wheel.style.animationPlayState = 'paused';
        }
    }
    
    resumeRotation() {
        if (this.wheel) {
            this.wheel.style.animationPlayState = 'running';
        }
    }
    
    slowRotation() {
        if (this.wheel) {
            this.wheel.style.animationDuration = '40s';
            setTimeout(() => {
                this.resumeRotation();
            }, 1000);
        }
    }
    
    manualRotate(deltaX) {
        if (this.wheel && !this.isAnimating) {
            this.isAnimating = true;
            this.currentRotation += deltaX * 0.5;
            
            this.wheel.style.transform = `rotate(${this.currentRotation}deg)`;
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 100);
        }
    }
    
    initializeAnimations() {
        // Add staggered entrance animations for segments
        this.segments.forEach((segment, index) => {
            segment.style.opacity = '0';
            segment.style.transform += ' scale(0.8)';
            
            setTimeout(() => {
                segment.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                segment.style.opacity = '1';
                segment.style.transform = segment.style.transform.replace(' scale(0.8)', '');
            }, index * 200);
        });
        
        // Animate flow arrows with staggered timing
        this.flowArrows.forEach((arrow, index) => {
            arrow.style.opacity = '0';
            setTimeout(() => {
                arrow.style.transition = 'opacity 0.6s ease-out';
                arrow.style.opacity = '1';
            }, index * 100 + 1000);
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.3 });
        
        if (this.wheel) {
            observer.observe(this.wheel);
        }
    }
}

class SkillCards {
    constructor() {
        this.cards = document.querySelectorAll('.skill-card');
        this.init();
    }
    
    init() {
        this.setupCardAnimations();
        this.setupHoverEffects();
    }
    
    setupCardAnimations() {
        this.cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150 + 500);
        });
    }
    
    setupHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCard(card);
            });
        });
    }
    
    enhanceCard(card) {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(167, 139, 250, 0.3)';
        
        // Add subtle icon animation
        const icon = card.querySelector('.skill-card-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    }
    
    resetCard(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
        
        const icon = card.querySelector('.skill-card-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }
}

class DevelopmentTimeline {
    constructor() {
        this.items = document.querySelectorAll('.development-item');
        this.init();
    }
    
    init() {
        this.setupTimelineAnimations();
        this.setupProgressBars();
    }
    
    setupTimelineAnimations() {
        this.items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300 + 800);
        });
    }
    
    setupProgressBars() {
        this.items.forEach(item => {
            const progressFill = item.querySelector('.progress-fill');
            if (progressFill) {
                const width = progressFill.style.width;
                
                // Reset width for animation
                progressFill.style.width = '0%';
                
                setTimeout(() => {
                    progressFill.style.transition = 'width 1.5s ease-out';
                    progressFill.style.width = width;
                }, 1000);
            }
        });
    }
}

class FloatingElements {
    constructor() {
        this.elements = document.querySelectorAll('.floating-element');
        this.init();
    }
    
    init() {
        this.setupParallaxEffect();
        this.addMouseInteraction();
    }
    
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            this.elements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${rate * speed}px) rotate(${rate * 0.1}deg)`;
            });
        });
    }
    
    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            this.elements.forEach((element, index) => {
                const moveX = (mouseX - 0.5) * (20 + index * 10);
                const moveY = (mouseY - 0.5) * (20 + index * 10);
                
                element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
}

class PageAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupPageLoadEffects();
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
    
    setupPageLoadEffects() {
        // Add entrance animation to hero content
        const heroContent = document.querySelector('.career-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Animate floating elements with delay
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0) rotate(180deg)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'scale(1) rotate(0deg)';
            }, 800 + (index * 200));
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization for scroll events
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-based animations
}, 16);

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for navigation to load first
    setTimeout(() => {
        new SkillsWheel();
        new SkillCards();
        new DevelopmentTimeline();
        new FloatingElements();
        new PageAnimations();
        
        // Add scroll event listener
        window.addEventListener('scroll', optimizedScrollHandler);
        
        console.log('Career Skills page initialized successfully');
    }, 500);
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes skillDetailsShow {
        from {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-segment {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .skill-segment:hover {
        z-index: 100;
    }
    
    .skill-details {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .flow-arrow {
        transition: all 0.3s ease;
    }
    
    .skill-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .development-content {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .floating-element {
        transition: all 0.3s ease;
    }
`;

document.head.appendChild(style);

// Export classes for potential external use
window.SkillsWheel = SkillsWheel;
window.SkillCards = SkillCards;
window.DevelopmentTimeline = DevelopmentTimeline;
window.FloatingElements = FloatingElements;
window.PageAnimations = PageAnimations;
