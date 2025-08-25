// Career Objective Page JavaScript

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

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Desktop navigation functionality handled by components/navbar.js

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.objective-card, .goal-item, .value-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Parallax effect for floating elements
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Add hover effects for objective cards
    const objectiveCards = document.querySelectorAll('.objective-card');
    
    objectiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects for value items
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Typing effect for career title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect if desired
    const careerTitle = document.querySelector('.career-title');
    if (careerTitle && window.innerWidth > 768) {
        const originalText = careerTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(careerTitle, originalText, 150);
    }

    // Add scroll-triggered animations for timeline
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const goalItems = entry.target.querySelectorAll('.goal-item');
                goalItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const goalsTimeline = document.querySelector('.goals-timeline');
    if (goalsTimeline) {
        const goalItems = goalsTimeline.querySelectorAll('.goal-item');
        goalItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        timelineObserver.observe(goalsTimeline);
    }

    // Add floating animation to abstract shapes
    const abstractShapes = document.querySelectorAll('.abstract-shape');
    
    abstractShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
        shape.style.animationDuration = `${4 + index * 0.5}s`;
    });

    // Enhanced mobile experience
    if (window.innerWidth <= 768) {
        // Add touch feedback for mobile
        const touchElements = document.querySelectorAll('.objective-card, .value-item, .goal-content');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Performance optimization: Throttle scroll events
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
        }
    }

    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(requestTick, 16); // ~60fps
    window.removeEventListener('scroll', requestTick);
    window.addEventListener('scroll', throttledScrollHandler);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroContent = document.querySelector('.career-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // Add CSS class for loaded state
    document.body.classList.add('js-enabled');
});

// Add some CSS animations via JavaScript for better performance
const style = document.createElement('style');
style.textContent = `
    .js-enabled .career-hero-content {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .js-enabled.loaded .career-hero-content {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .floating-element {
        will-change: transform;
    }
    
    .abstract-shape {
        will-change: transform, opacity;
    }
    
    .objective-card,
    .goal-item,
    .value-item {
        will-change: transform, opacity;
    }
`;

document.head.appendChild(style);
