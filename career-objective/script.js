// Career Objective Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavGroups = document.querySelectorAll('.mobile-nav-group');

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Mobile menu close
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
        });
    }

    // Mobile navigation group toggles
    mobileNavGroups.forEach(group => {
        const title = group.querySelector('.mobile-group-title');
        const linksContainer = group.querySelector('.mobile-nav-links-container');
        
        if (title && linksContainer) {
            title.addEventListener('click', function() {
                this.classList.toggle('active');
                linksContainer.classList.toggle('active');
            });
        }
    });

    // Mobile bottom navigation functionality
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            // Remove active class from all items
            mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation based on section
            handleMobileNavigation(section);
        });
    });

    // Handle mobile navigation sections
    function handleMobileNavigation(section) {
        switch(section) {
            case 'home':
                // Navigate to home page
                window.location.href = '../index.html';
                break;
            case 'profile':
                // Toggle submenu for profile section
                toggleSubmenu('profile');
                break;
            case 'experience':
                // Toggle submenu for experience section
                toggleSubmenu('experience');
                break;
            case 'recognition':
                // Toggle submenu for recognition section
                toggleSubmenu('recognition');
                break;
            case 'documents':
                // Toggle submenu for documents section
                toggleSubmenu('documents');
                break;
        }
    }

    // Function to toggle submenus
    function toggleSubmenu(section) {
        const allSubmenus = document.querySelectorAll('.submenu-bubble');
        const targetSubmenu = document.querySelector(`#${section}-submenu`);
        
        // Close all other submenus
        allSubmenus.forEach(submenu => {
            if (submenu !== targetSubmenu) {
                submenu.classList.remove('active');
            }
        });
        
        // Position the submenu smartly before showing it
        if (targetSubmenu) {
            positionSubmenuBubble(targetSubmenu, document.querySelector(`[data-section="${section}"]`));
            targetSubmenu.classList.toggle('active');
        }
    }

    // Function to position submenu bubble smartly
    function positionSubmenuBubble(submenu, navItem) {
        const navItemRect = navItem.getBoundingClientRect();
        const submenuWidth = submenu.offsetWidth;
        const viewportWidth = window.innerWidth;
        const navItemCenter = navItemRect.left + (navItemRect.width / 2);

        // Remove any existing edge classes
        submenu.classList.remove('edge-left', 'edge-right');

        // Check left edge
        if (navItemCenter - (submenuWidth / 2) < 20) {
            submenu.classList.add('edge-left');
        }
        // Check right edge
        else if (navItemCenter + (submenuWidth / 2) > viewportWidth - 20) {
            submenu.classList.add('edge-right');
        }
    }

    // Close submenus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-nav-item')) {
            const allSubmenus = document.querySelectorAll('.submenu-bubble');
            allSubmenus.forEach(submenu => {
                submenu.classList.remove('active');
            });
        }
    });

    // Handle window resize to reposition submenus
    window.addEventListener('resize', () => {
        // Reposition any open submenus
        const activeSubmenu = document.querySelector('.submenu-bubble.active');
        if (activeSubmenu) {
            const navItem = activeSubmenu.closest('.mobile-nav-item');
            if (navItem) {
                positionSubmenuBubble(activeSubmenu, navItem);
            }
        }
    });

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

    // Desktop Navigation Dropdown Functionality
    const navGroups = document.querySelectorAll('.nav-group');
    
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
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navGroups.forEach(group => {
                group.classList.remove('active');
            });
        });
    });

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
