// Main Content Functionality
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
            const margin = 20; // Minimum margin from screen edges
            
            // Remove any existing edge positioning classes
            bubble.classList.remove('edge-left', 'edge-right');
            
            // Calculate the center position of the nav item
            const itemCenter = rect.left + (rect.width / 2);
            let left = itemCenter - (bubbleWidth / 2);
            
            // Check if bubble would go off screen on the left
            if (left < margin) {
                // Position at left edge with margin
                left = margin;
                bubble.classList.add('edge-left');
            }
            // Check if bubble would go off screen on the right
            else if (left + bubbleWidth > viewportWidth - margin) {
                // Position at right edge with margin
                left = viewportWidth - bubbleWidth - margin;
                bubble.classList.add('edge-right');
            }
            
            // Additional smart positioning: if bubble is too wide for viewport
            if (bubbleWidth > viewportWidth - (margin * 2)) {
                // Center the bubble and make it responsive
                left = margin;
                bubble.style.maxWidth = `${viewportWidth - (margin * 2)}px`;
                bubble.classList.add('edge-left');
            }
            
            // Position the bubble above the nav item with proper spacing
            bubble.style.left = left + 'px';
            bubble.style.bottom = '80px';
            
            // Update the speech bubble tail position to point to the nav item
            const tailOffset = itemCenter - left;
            bubble.style.setProperty('--tail-offset', `${tailOffset}px`);
            
            // Ensure tail doesn't go outside the bubble bounds
            const minTailOffset = 20; // Minimum distance from bubble edge
            const maxTailOffset = bubbleWidth - 20;
            const clampedTailOffset = Math.max(minTailOffset, Math.min(maxTailOffset, tailOffset));
            bubble.style.setProperty('--tail-offset', `${clampedTailOffset}px`);
            
            console.log('Smart positioned bubble:', { 
                left, 
                bottom: '80px',
                itemCenter,
                tailOffset: clampedTailOffset,
                itemLeft: rect.left,
                itemWidth: rect.width,
                bubbleWidth,
                viewportWidth,
                edgeLeft: bubble.classList.contains('edge-left'),
                edgeRight: bubble.classList.contains('edge-right'),
                maxWidth: bubble.style.maxWidth
            });
        }

        // Function to validate and adjust bubble positioning if needed
        function validateBubblePosition(bubble) {
            const rect = bubble.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const margin = 20;
            
            let needsRepositioning = false;
            let newLeft = parseFloat(bubble.style.left);
            let newBottom = parseFloat(bubble.style.bottom);
            
            // Check if bubble is off-screen horizontally
            if (rect.left < margin) {
                newLeft = margin;
                needsRepositioning = true;
            } else if (rect.right > viewportWidth - margin) {
                newLeft = viewportWidth - rect.width - margin;
                needsRepositioning = true;
            }
            
            // Check if bubble is off-screen vertically (shouldn't happen with bottom positioning, but safety check)
            if (rect.bottom > viewportHeight - margin) {
                newBottom = viewportHeight - rect.height - margin;
                needsRepositioning = true;
            }
            
            // Apply repositioning if needed
            if (needsRepositioning) {
                bubble.style.left = newLeft + 'px';
                bubble.style.bottom = newBottom + 'px';
                console.log('Bubble repositioned due to validation:', { newLeft, newBottom });
            }
            
            return needsRepositioning;
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
                        
                        // Validate and adjust positioning if needed
                        setTimeout(() => {
                            validateBubblePosition(bubble);
                        }, 50); // Small delay to ensure DOM updates are complete
                        
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
            // Reposition any open submenus to ensure they're still properly positioned
            const activeBubbles = document.querySelectorAll('.submenu-bubble.active');
            activeBubbles.forEach(bubble => {
                const navItem = bubble.closest('.mobile-nav-item');
                if (navItem) {
                    positionSubmenuBubble(bubble, navItem);
                    // Validate positioning after resize
                    setTimeout(() => {
                        validateBubblePosition(bubble);
                    }, 50);
                }
            });
            
            // Close all submenus on resize if no active bubbles found
            if (activeBubbles.length === 0) {
                closeAllSubmenus();
            }
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
    initializeNavigation();

    // Add hover effects to reference cards
    const referenceCards = document.querySelectorAll('.reference-card');
    referenceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click-to-copy functionality for phone numbers
    const phoneNumbers = document.querySelectorAll('.contact-phone');
    phoneNumbers.forEach(phone => {
        phone.style.cursor = 'pointer';
        phone.title = 'Click to copy';
        
        phone.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#28a745';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '#4D869B';
                }, 1500);
            }).catch(err => {
                console.log('Failed to copy text: ', err);
            });
        });
    });

    // Add smooth reveal animation for reference cards
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

    // Observe all reference cards and testimonials
    const animatedElements = document.querySelectorAll('.reference-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading animation for the page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add CSS for print styles
const printStyles = `
    @media print {
        .navbar, .mobile-bottom-nav {
            display: none !important;
        }
        
        .main-content {
            padding-top: 0 !important;
        }
        
        .reference-card, .testimonial-card {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid #ccc !important;
        }
        
        body {
            background: white !important;
            color: black !important;
        }
        
        .page-title, .section-title {
            color: black !important;
            text-shadow: none !important;
        }
        
        .page-subtitle {
            color: #333 !important;
        }
    }
`;

// Inject print styles
const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);
