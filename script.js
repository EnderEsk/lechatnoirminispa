
// Personal Management Page JavaScript

// Profile Bubble Popup functionality
function initializeProfileBubble() {
    const aboutMeBtn = document.getElementById('about-me-btn');
    const profileBubble = document.getElementById('profile-bubble');
    const bubbleArrow = profileBubble?.querySelector('.bubble-arrow');
    
    if (aboutMeBtn && profileBubble) {
        // Toggle bubble on click
        aboutMeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isVisible = profileBubble.classList.contains('show');
            
            if (!isVisible) {
                positionBubble(aboutMeBtn, profileBubble, bubbleArrow);
            }
            
            profileBubble.classList.toggle('show');
        });
        
        // Close bubble when clicking outside
        document.addEventListener('click', (e) => {
            if (!aboutMeBtn.contains(e.target) && !profileBubble.contains(e.target)) {
                profileBubble.classList.remove('show');
            }
        });
        
        // Close bubble on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                profileBubble.classList.remove('show');
            }
        });
        
        // Reposition bubble on window resize
        window.addEventListener('resize', () => {
            if (profileBubble.classList.contains('show')) {
                positionBubble(aboutMeBtn, profileBubble, bubbleArrow);
            }
        });
    }
}

// Smart positioning function for the bubble popup
function positionBubble(button, bubble, arrow) {
    const buttonRect = button.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate available space in each direction
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    const spaceRight = viewportWidth - buttonRect.left;
    const spaceLeft = buttonRect.right;
    
    // Determine vertical position (prefer below, fallback to above)
    let top, arrowTop, arrowBorder;
    if (spaceBelow >= bubbleRect.height + 2) {
        // Position below button with minimal gap (2px)
        top = buttonRect.bottom + 2;
        arrowTop = -8;
        arrowBorder = 'border-bottom: 8px solid rgba(51, 58, 87, 0.95);';
    } else if (spaceAbove >= bubbleRect.height + 2) {
        // Position above button with minimal gap (2px)
        top = buttonRect.top - bubbleRect.height - 2;
        arrowTop = bubbleRect.height;
        arrowBorder = 'border-top: 8px solid rgba(51, 58, 87, 0.95);';
    } else {
        // Center vertically if no space above or below
        top = Math.max(10, (viewportHeight - bubbleRect.height) / 2);
        arrowTop = -8;
        arrowBorder = 'border-bottom: 8px solid rgba(51, 58, 87, 0.95);';
    }
    
    // Determine horizontal position (prefer center, adjust if off-screen)
    let left, arrowLeft;
    const preferredLeft = buttonRect.left + (buttonRect.width / 2) - (bubbleRect.width / 2);
    
    if (preferredLeft >= 10 && preferredLeft + bubbleRect.width <= viewportWidth - 10) {
        // Center on button
        left = preferredLeft;
        arrowLeft = (bubbleRect.width / 2) - 8;
    } else if (spaceRight >= bubbleRect.width) {
        // Position to the right with minimal gap (2px)
        left = buttonRect.right + 2;
        arrowLeft = -8;
    } else if (spaceLeft >= bubbleRect.width) {
        // Position to the left with minimal gap (2px)
        left = buttonRect.left - bubbleRect.width - 2;
        arrowLeft = bubbleRect.width - 8;
    } else {
        // Center horizontally if no space on sides
        left = Math.max(10, (viewportWidth - bubbleRect.width) / 2);
        arrowLeft = (bubbleRect.width / 2) - 8;
    }
    
    // Apply positions
    bubble.style.top = `${top}px`;
    bubble.style.left = `${left}px`;
    
    // Position and style the arrow
    if (arrow) {
        arrow.style.top = `${arrowTop}px`;
        arrow.style.left = `${arrowLeft}px`;
        arrow.style.cssText += arrowBorder;
    }
}

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
        mobileNavItems: mobileNavItems.length,
        mobileMenuToggle: !!mobileMenuToggle,
        mobileMenuOverlay: !!mobileMenuOverlay,
        mobileMenuClose: !!mobileMenuClose,
        mobileGroupTitles: mobileGroupTitles.length
    });
    
    // Debug: Log all found elements
    console.log('Navbar element:', navbar);
    console.log('Nav links:', navLinks);
    console.log('Nav groups:', navGroups);
    console.log('Mobile bottom nav:', mobileBottomNav);
    console.log('Mobile nav items:', mobileNavItems);

    if (!navbar) {
        console.error('Navbar element not found!');
        console.error('Available elements with id:', document.querySelectorAll('[id]'));
        return;
    }
    
    // Debug: Check navbar styles
    const navbarStyles = window.getComputedStyle(navbar);
    console.log('Navbar computed styles:', {
        position: navbarStyles.position,
        top: navbarStyles.top,
        left: navbarStyles.left,
        width: navbarStyles.width,
        height: navbarStyles.height,
        display: navbarStyles.display,
        visibility: navbarStyles.visibility,
        zIndex: navbarStyles.zIndex,
        backgroundColor: navbarStyles.backgroundColor
    });
    
    // Debug: Check if navbar is in viewport
    const navbarRect = navbar.getBoundingClientRect();
    console.log('Navbar bounding rect:', navbarRect);
    console.log('Viewport dimensions:', {
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    // Debug: Check navbar parent elements
    let parent = navbar.parentElement;
    let depth = 0;
    while (parent && depth < 5) {
        console.log(`Parent ${depth}:`, parent.tagName, parent.className, parent.id);
        const parentStyles = window.getComputedStyle(parent);
        console.log(`Parent ${depth} styles:`, {
            position: parentStyles.position,
            overflow: parentStyles.overflow,
            display: parentStyles.display
        });
        parent = parent.parentElement;
        depth++;
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
            
            // Allow external links and page navigation to work normally
            if (href.startsWith('http') || 
                href.startsWith('/career-objective') || href.startsWith('career-objective/') || href.startsWith('./career-objective/') || 
                href.startsWith('/personal-management') || href.startsWith('personal-management/') || href.startsWith('./personal-management/') ||
                href.startsWith('/personal-interests') || href.startsWith('personal-interests/') || href.startsWith('./personal-interests/') ||
                href.startsWith('/work-history') || href.startsWith('work-history/') || href.startsWith('./work-history/') ||
                href.startsWith('/career-skills') || href.startsWith('career-skills/') || href.startsWith('./career-skills/') ||
                href.startsWith('/awards-achievements') || href.startsWith('awards-achievements/') || href.startsWith('./awards-achievements/') ||
                href.startsWith('/cover-letter') || href.startsWith('cover-letter/') || href.startsWith('./cover-letter/') ||
                href.startsWith('/references') || href.startsWith('references/') || href.startsWith('./references/') ||
                href.startsWith('/portfolio') || href.startsWith('portfolio/') || href.startsWith('./portfolio/') ||
                href === '/') {
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
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe content sections for animation
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeProfileBubble();
    const contentSections = document.querySelectorAll('.content-section');
    
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.3;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
});



// Typing effect for slogan
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const slogan = document.querySelector('.slogan');
    if (slogan) {
        const originalText = slogan.textContent;
        typeWriter(slogan, originalText, 50);
    }
});



// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add CSS class for loaded state
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

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
document.addEventListener('DOMContentLoaded', cleanURLs);

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




