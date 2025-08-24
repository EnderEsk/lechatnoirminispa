# Le Chat Noir Mini Spa Website

A beautiful, responsive website for "Le Chat Noir Mini Spa" featuring elegant animations, modern design, and professional navigation.

## Features

### 🎨 Design & Styling
- **Color Scheme**: 
  - Navigation Bar: `#333A57` (deep blue-gray)
  - Hero Overlay: `#422C47` (deep purple)
  - Accent Color: `#D4AF37` (golden)
- **Typography**: 
  - Business Name: Dancing Script (cursive)
  - Subtitles: Playfair Display (serif)
  - Body Text: Inter (sans-serif)
- **Responsive Design**: Mobile-first approach with hamburger menu

### 🚀 Animations & Interactions
- **Smooth Scroll**: Navigation links smoothly scroll to sections
- **Navbar Transparency**: Becomes semi-transparent on scroll
- **Fade-in Effects**: Content sections animate in as you scroll
- **Hover Effects**: Interactive buttons and navigation items
- **Parallax**: Subtle parallax effect on hero section
- **Typing Effect**: Slogan types out on page load

### 📱 Navigation Structure
- **Career Objective** - Direct link
- **Work History** - Direct link  
- **Awards & Achievements** - Direct link
- **Professional Skills** - Dropdown menu
  - Career Skills
  - Personal Management
  - Work History
- **Documents** - Dropdown menu
  - Cover Letter
  - Resume

### 🎯 Call-to-Action Buttons
- **Primary Button**: "Book Appointment" (golden gradient)
- **Secondary Button**: "View Services" (outlined style)
- Both buttons feature hover animations and smooth transitions

## File Structure

```
lechatnoirminispa-main/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization Guide

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
/* Navigation bar color */
.navbar { background-color: #333A57; }

/* Hero overlay color */
.hero-overlay { background-color: #422C47; }

/* Accent color */
.cta-btn.primary { background: linear-gradient(135deg, #D4AF37, #B8860B); }
```

### Adding Background Image
Replace the placeholder in `styles.css`:
```css
.hero-image-placeholder {
    background-image: url('path/to/your/image.jpg');
    background-size: cover;
    background-position: center;
}
```

### Modifying Navigation Items
Edit the navigation structure in `index.html`:
```html
<ul class="nav-menu">
    <li class="nav-item">
        <a href="#section-id" class="nav-link">Section Name</a>
    </li>
</ul>
```

### Adjusting Animations
Modify animation timing in `styles.css`:
```css
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance Features

- **Lazy Loading**: Content sections animate in as they come into view
- **Smooth Transitions**: CSS transitions for smooth animations
- **Optimized Animations**: Uses CSS transforms for better performance
- **Responsive Images**: Background images scale appropriately

## Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **Customize content**: Edit the HTML to add your specific content
3. **Modify styling**: Adjust colors, fonts, and layouts in `styles.css`
4. **Add functionality**: Enhance interactions in `script.js`

## Adding Your Content

### Hero Section
Update the business name, subtitle, and slogan in `index.html`:
```html
<h1 class="business-name">Your Business Name</h1>
<h2 class="business-subtitle">Your Subtitle</h2>
<p class="slogan">Your compelling slogan here</p>
```

### Content Sections
Add your content to each section:
```html
<section id="career-objective" class="content-section">
    <div class="container">
        <h2>Your Section Title</h2>
        <p>Your content here...</p>
    </div>
</section>
```

## Tips for Best Results

1. **Use high-quality images** for the hero background
2. **Keep content concise** for better readability
3. **Test on mobile devices** to ensure responsiveness
4. **Optimize images** for web use to improve loading speed
5. **Use consistent branding** throughout the content

## Support

For questions or customization help, refer to the code comments or modify the files as needed. The website is built with standard web technologies and should work in any modern browser.

---

**Built with ❤️ for Le Chat Noir Mini Spa**