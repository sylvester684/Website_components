# Web Development Learning Template

![Project Screenshot](./screenshot.jpg)

A modern, responsive template for learning web development fundamentals with interactive components and theme customization features.

## Features

- 🎨 **Theme Customization**
  - Color picker for background, text, primary & secondary colors
  - Font selector with multiple options
  - Theme persistence using localStorage
  - Import/Export theme configurations

- 🌟 **Interactive Components**
  - Smooth scroll navigation
  - Responsive image gallery
  - Contact form with validation
  - Social media integration
  - Undo/Redo functionality for color changes

- 📱 **Responsive Design**
  - Mobile-first approach
  - Hamburger menu for mobile devices
  - Flexible grid layouts
  - Cross-browser compatibility

- 🛠 **Developer Friendly**
  - Clean, well-commented code
  - CSS variables for easy theming
  - Semantic HTML structure
  - Accessible components

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/web-dev-template.git
   cd web-dev-template
   ```

2. **Install dependencies**
   ```bash
   npm install  # Optional (if using build tools)
   ```

3. **Start local server**
   ```bash
   npm start  # Or open index.html directly in browser
   ```

## Usage

### Basic Customization
1. **Change Colors**
   - Click "Customize Colors" button
   - Use color pickers to modify theme colors
   - Click "Reset Defaults" to restore original colors

2. **Font Selection**
   - Use dropdown in bottom-left corner
   - Choose from available font options

3. **Theme Management**
   - **Export**: Click "Export Theme" to save configuration
   - **Import**: Use "Import Theme" button to load JSON file

### Advanced Features
- **Undo/Redo**: Use <kbd>Ctrl+Z</kbd>/<kbd>Ctrl+Shift+Z</kbd> or buttons in color picker
- **Mobile Menu**: Click hamburger icon (☰) on mobile devices
- **Form Validation**: Real-time validation for contact form

### Keyboard Shortcuts
| Shortcut          | Action                |
|-------------------|-----------------------|
| <kbd>Ctrl+S</kbd> | Save current theme    |
| <kbd>Ctrl+L</kbd> | Load default theme    |
| <kbd>Esc</kbd>    | Close color picker    |

## File Structure
```
web-dev-template/
├── index.html          # Main HTML file
├── stylish.css         # Stylesheet
├── start.js            # JavaScript functionality
├── images/             # Image assets
│   ├── logo.jpg        # Website logo
│   ├── web-design.jpg  # Gallery images
│   └── ...             
└── README.md           # Documentation
```

## Customization Guide

### Modify Colors
Edit CSS variables in `:root` selector:
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --background-color: #ffffff;
  --text-color: #333333;
}
```

### Add New Fonts
1. Add font options to selector:
```html
<option value="Your Font">Your Font</option>
```
2. Include font in CSS:
```css
body {
  font-family: var(--current-font, 'Your Font'), fallback-fonts;
}
```

### Extend Functionality
Add new features to `start.js`:
```javascript
// Example: Add new theme component
document.getElementById('accentColor').addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--accent-color', e.target.value);
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please adhere to [code of conduct](CODE_OF_CONDUCT.md).

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Font Awesome](https://fontawesome.com) for icons
- [Unsplash](https://unsplash.com) for sample images
- [Google Fonts](https://fonts.google.com) for typography

---

**Happy Coding!** 👨💻👩💻
