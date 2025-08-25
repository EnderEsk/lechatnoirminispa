# Portfolio Structure Guide

This portfolio is organized into three main categories to showcase different types of work and content.

## 📁 Image Categories

### 1. Before & After Gallery
- **Purpose**: Showcase transformative results of esthetic treatments
- **Images**: `before1.png` through `before6.png` and `after1.png` through `after6.png`
- **Layout**: Side-by-side pairs showing before and after results
- **File Naming**: Use `before#.png` and `after#.png` format

### 2. Work Portfolio
- **Purpose**: Display additional creative work and professional projects
- **Images**: `work1.png` through `work16.png` (16 total images)
- **Layout**: Grid layout with individual project showcases
- **File Naming**: Use `work#.png` format

### 3. Behind the Scenes (BTS)
- **Purpose**: Show the creative process and daily operations
- **Images**: `bts1.jpg` (currently 1 image)
- **Layout**: Grid layout with individual BTS photos
- **File Naming**: Use `bts#.jpg` format

## 🚀 Adding New Images

### Adding Before & After Images
1. Add your `before#.png` and `after#.png` files to the `images/` directory
2. Update the HTML in `index.html` by adding new portfolio pairs
3. Follow the existing pattern for consistency

### Adding Work Portfolio Images
1. Add your `work#.png` files to the `images/` directory
2. Update the HTML in the Work Portfolio section
3. Ensure consistent naming convention

### Adding BTS Images
1. Add your `bts#.png` files to the `images/` directory
2. Use the helper script `add-bts-images.js` to generate HTML
3. Replace the placeholder content in the BTS section

## 📱 Responsive Design

The portfolio automatically adjusts for different screen sizes:
- **Desktop**: Multi-column grid layouts
- **Tablet**: Adjusted spacing and single-column for small screens
- **Mobile**: Single-column layout with optimized spacing

## 🎨 Styling

Each category has its own styling:
- **Before & After**: Paired layout with color-coded borders
- **Work Portfolio**: Individual cards with hover effects
- **BTS**: Individual cards with hover effects
- **Placeholders**: Styled placeholders for future content

## 🔧 Helper Scripts

- `add-bts-images.js`: Generates HTML for BTS images
- Run with Node.js: `node add-bts-images.js`

## 📝 File Organization

```
portfolio/
├── images/
│   ├── before1.png - before6.png
│   ├── after1.png - after6.png
│   ├── work1.png, work2.png, work3.png, work4.png, work7.png, work8.png
│   └── bts1.png, bts2.png, bts3.png (to be added)
├── index.html
├── styles.css
├── script.js
├── add-bts-images.js
└── PORTFOLIO_STRUCTURE.md
```

## 💡 Tips

- Keep image dimensions consistent within each category
- Use descriptive alt text for accessibility
- Optimize images for web (compress PNG files)
- Test responsive behavior on different devices
- Update this documentation when adding new categories
