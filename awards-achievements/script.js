// Awards & Achievements Page JavaScript - JSON-based
document.addEventListener('DOMContentLoaded', function() {
    initializeAwardsPage();
});

function initializeAwardsPage() {
    console.log('Initializing Awards & Achievements page...');
    
    // Initialize components
    initializeNavigation();
    initializeFooter();
    
    // Load and display awards data
    loadAwardsData();
    
    console.log('Awards & Achievements page initialized successfully');
}

// Navigation and Footer Initialization
function initializeNavigation() {
    if (typeof NavigationLoader !== 'undefined') {
        const navLoader = new NavigationLoader();
        navLoader.initialize();
    } else {
        console.log('Navigation component loader not found, loading manually...');
        loadNavigationManually();
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

console.log('Awards & Achievements JavaScript (JSON-based) loaded successfully');
