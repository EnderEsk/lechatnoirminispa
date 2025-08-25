// Awards & Achievements Page JavaScript - JSON-based

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
            } else if (currentPath.includes('awards-achievements/index.html')) {
                const recognitionItem = document.querySelector('[data-section="recognition"]');
                if (recognitionItem) recognitionItem.classList.add('active');
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
    initializeAwardsPage();
});

function initializeAwardsPage() {
    console.log('Initializing Awards & Achievements page...');
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize footer
    initializeFooter();
    
    // Load and display awards data
    loadAwardsData();
    
    console.log('Awards & Achievements page initialized successfully');
}

// Footer Initialization
function initializeFooter() {
    if (typeof loadFooter !== 'undefined') {
        loadFooter();
    } else {
        console.log('Footer component loader not found, loading manually...');
        loadFooterManually();
    }
}

function initializeFooter() {
    if (typeof loadFooter !== 'undefined') {
        loadFooter();
    } else {
        console.log('Footer component loader not found, loading manually...');
        loadFooterManually();
    }
}

function loadNavigationManually() {
    // Fallback navigation loading
    console.log('Loading navigation manually...');
}

function loadFooterManually() {
    // Fallback footer loading
    console.log('Loading footer manually...');
}

// Awards Data Management
let awardsData = [];
let currentFilter = 'all';

async function loadAwardsData() {
    try {
        console.log('Loading awards data from JSON file...');
        
        const response = await fetch('awards-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load awards data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        awardsData = data.awards || [];
        
        console.log('Awards data loaded successfully:', awardsData);
        
        // Display awards and update UI
        displayAwards();
        createCategoryFilter(data.categories || []);
        updateSummaryStats();
        
    } catch (error) {
        console.error('Error loading awards data:', error);
        showNotification('Failed to load awards data. Please check the JSON file.', 'error');
        
        // Fallback: create sample data
        createFallbackData();
    }
}

function createFallbackData() {
    console.log('Creating fallback data...');
    awardsData = [
        {
            id: 1,
            title: "Sample Award",
            description: "This is a sample award. Please check your awards-data.json file.",
            date: "Sample Date",
            organization: "Sample Organization",
            image: null,
            category: "Sample",
            badge: "🏆"
        }
    ];
    
    displayAwards();
    updateSummaryStats();
}

// Display Awards
function displayAwards() {
    const awardsGrid = document.getElementById('awardsGrid');
    if (!awardsGrid) return;
    
    // Clear existing content
    awardsGrid.innerHTML = '';
    
    // Filter awards based on current selection
    const filteredAwards = currentFilter === 'all' 
        ? awardsData 
        : awardsData.filter(award => award.category === currentFilter);
    
    if (filteredAwards.length === 0) {
        awardsGrid.innerHTML = `
            <div class="no-awards-message">
                <h3>No awards found for this category</h3>
                <p>Try selecting a different category or check your JSON data file.</p>
            </div>
        `;
        return;
    }
    
    // Create award cards
    filteredAwards.forEach((award, index) => {
        const awardCard = createAwardCard(award, index);
        awardsGrid.appendChild(awardCard);
    });
}

function createAwardCard(award, index) {
    const card = document.createElement('div');
    card.className = 'award-card';
    card.dataset.award = award.id;
    card.dataset.category = award.category;
    
    // Add animation delay
    card.style.animationDelay = `${(index + 1) * 0.1}s`;
    
    const imagePath = award.image ? `images/${award.image}` : null;
    
    card.innerHTML = `
        <div class="award-image-container">
            ${imagePath ? 
                `<img src="${imagePath}" alt="${award.title}" class="award-image" onerror="this.style.display='none'">` :
                `<div class="no-image-placeholder">
                    <div class="placeholder-icon">🏆</div>
                    <p>No Image</p>
                </div>`
            }
            <div class="award-overlay">
                <div class="award-badge">${award.badge}</div>
            </div>
        </div>
        <div class="award-content">
            <h3 class="award-title">${award.title}</h3>
            <div class="award-description">
                <p>${award.description}</p>
            </div>
            <div class="award-meta">
                <span class="award-date">Date: ${award.date}</span>
                <span class="award-organization">Organization: ${award.organization}</span>
            </div>
            <div class="award-category">${award.category}</div>
        </div>
    `;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        addCardGlow(card);
    });
    
    card.addEventListener('mouseleave', function() {
        removeCardGlow(card);
    });
    
    return card;
}

function addCardGlow(card) {
    card.style.boxShadow = '0 0 30px rgba(167, 139, 250, 0.3)';
}

function removeCardGlow(card) {
    card.style.boxShadow = '';
}

// Category Filter
function createCategoryFilter(categories) {
    const categoryButtons = document.getElementById('categoryButtons');
    if (!categoryButtons) return;
    
    // Clear existing buttons
    categoryButtons.innerHTML = '';
    
    // Add "All" button
    const allButton = createCategoryButton('all', 'All Categories');
    allButton.classList.add('active');
    categoryButtons.appendChild(allButton);
    
    // Add category buttons
    categories.forEach(category => {
        const button = createCategoryButton(category, category);
        categoryButtons.appendChild(button);
    });
}

function createCategoryButton(category, label) {
    const button = document.createElement('button');
    button.className = 'category-btn';
    button.textContent = label;
    button.dataset.category = category;
    
    button.addEventListener('click', function() {
        // Update active state
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter awards
        currentFilter = category;
        displayAwards();
        
        // Show notification
        const filterText = category === 'all' ? 'all categories' : category;
        showNotification(`Showing awards from ${filterText}`, 'info');
    });
    
    return button;
}

// Summary Statistics
function updateSummaryStats() {
    updateTotalAwards();
    updateTotalCategories();
    updateLatestAward();
}

function updateTotalAwards() {
    const totalElement = document.getElementById('totalAwards');
    if (totalElement) {
        totalElement.textContent = awardsData.length;
    }
}

function updateTotalCategories() {
    const categoriesElement = document.getElementById('totalCategories');
    if (categoriesElement) {
        const uniqueCategories = [...new Set(awardsData.map(award => award.category))];
        categoriesElement.textContent = uniqueCategories.length;
    }
}

function updateLatestAward() {
    const latestElement = document.getElementById('latestAward');
    if (latestElement && awardsData.length > 0) {
        // Sort by date (assuming dates are in a sortable format)
        const sortedAwards = [...awardsData].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
        
        const latestAward = sortedAwards[0];
        latestElement.textContent = latestAward.date;
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

// Inject notification styles
const styleElement = document.createElement('style');
styleElement.textContent = notificationStyles;
document.head.appendChild(styleElement);

// Error handling for missing images
function handleImageError(img) {
    img.style.display = 'none';
    const container = img.parentElement;
    if (container) {
        container.innerHTML = `
            <div class="no-image-placeholder">
                <div class="placeholder-icon">🏆</div>
                <p>Image Not Found</p>
            </div>
        `;
    }
}

// Add CSS for no-image placeholder
const placeholderStyles = `
    .no-image-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: rgba(255, 255, 255, 0.6);
        background: linear-gradient(135deg, #4D869B, #A78BFA);
    }
    
    .placeholder-icon {
        font-size: 3rem;
        margin-bottom: 0.5rem;
        opacity: 0.7;
    }
    
    .no-image-placeholder p {
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0.8;
    }
    
    .no-awards-message {
        text-align: center;
        padding: 3rem;
        color: rgba(255, 255, 255, 0.7);
        grid-column: 1 / -1;
    }
    
    .no-awards-message h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #ffffff;
    }
`;

// Inject placeholder styles
const placeholderStyleElement = document.createElement('style');
placeholderStyleElement.textContent = placeholderStyles;
document.head.appendChild(placeholderStyleElement);

// Auto-refresh functionality (optional)
function setupAutoRefresh() {
    // Refresh data every 5 minutes to pick up JSON changes
    setInterval(() => {
        console.log('Auto-refreshing awards data...');
        loadAwardsData();
    }, 5 * 60 * 1000);
}

// Initialize auto-refresh (uncomment if desired)
// setupAutoRefresh();

// PDF Preview Functionality
function openPdfPreview() {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on the modal for accessibility
        modal.focus();
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
        
        // Add click outside to close
        modal.addEventListener('click', handleModalOutsideClick);
        
        console.log('PDF preview modal opened');
    }
}

function closePdfPreview() {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove event listeners
        document.removeEventListener('keydown', handleEscapeKey);
        modal.removeEventListener('click', handleModalOutsideClick);
        
        console.log('PDF preview modal closed');
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closePdfPreview();
    }
}

function handleModalOutsideClick(e) {
    if (e.target === e.currentTarget) {
        closePdfPreview();
    }
}

// Close modal when clicking on close button or outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        // Close modal when clicking on close button
        const closeBtn = modal.querySelector('.pdf-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closePdfPreview);
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePdfPreview();
            }
        });
    }
});

console.log('Awards & Achievements JavaScript (JSON-based) loaded successfully');
