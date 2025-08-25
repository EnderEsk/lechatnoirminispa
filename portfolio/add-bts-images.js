// Helper script to add BTS (Behind the Scenes) images to the portfolio
// Usage: Update the btsImages array and run this script to generate HTML

const btsImages = [
    // Current BTS images
    { filename: 'bts1.jpg', alt: 'Behind the scenes 1' },
    // Add more BTS images here as needed:
    // { filename: 'bts2.jpg', alt: 'Behind the scenes 2' },
    // { filename: 'bts3.jpg', alt: 'Behind the scenes 3' },
];

function generateBTSHTML() {
    if (btsImages.length === 0) {
        console.log('No BTS images defined. Please add images to the btsImages array.');
        return;
    }
    
    let html = '';
    
    btsImages.forEach((image, index) => {
        html += `
                    <div class="portfolio-item bts-item">
                        <div class="portfolio-image-container">
                            <img src="images/${image.filename}" alt="${image.alt}" class="portfolio-image">
                            <div class="portfolio-overlay">
                                <span class="portfolio-label">${image.label}</span>
                            </div>
                        </div>
                    </div>`;
    });
    
    console.log('Generated BTS HTML:');
    console.log(html);
    console.log('\nCopy this HTML and replace the placeholder content in the BTS section of index.html');
}

// Run the generator
generateBTSHTML();

// Instructions for use:
console.log('\n=== INSTRUCTIONS ===');
console.log('1. Add your BTS image files to the portfolio/images/ directory');
console.log('2. Update the btsImages array above with your image details');
console.log('3. Run this script to generate the HTML');
console.log('4. Copy the generated HTML and replace the placeholder content in index.html');
console.log('5. Remove the placeholder divs and add your actual BTS images');
