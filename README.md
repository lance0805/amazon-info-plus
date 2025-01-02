# Amazon Info Plus

A Chrome extension that helps you quickly view product information on Amazon Japan, including manufacturer, seller, and delivery method.

## Features

- 🔍 Instantly displays key product information:
  - Manufacturer
  - Seller
  - Delivery Method
- 🌐 Supports multiple languages:
  - English
  - Japanese (default)
- 🎯 Currently supports Amazon Japan (amazon.co.jp) only
- 🖱️ Simple click interaction:
  - Click the button to show info
  - Click outside to dismiss

## Installation

### For Development

1. Clone this repository
```bash
git clone https://github.com/yourusername/amazon-info-plus.git
cd amazon-info-plus
```

2. Install dependencies
```bash
npm install
```

3. Build the extension
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory from this project

### For Users

*Coming soon to Chrome Web Store*

## Development

### Project Structure
```
amazon-info-plus/
├── dist/               # Built extension files
├── src/
│   ├── content.ts     # Content script for product info extraction
│   ├── popup.ts       # Popup script
│   ├── popup.html     # Popup HTML
│   └── i18n.ts        # Internationalization support
├── icons/             # Extension icons
├── manifest.json      # Extension manifest
├── webpack.config.js  # Webpack configuration
└── package.json       # Project dependencies and scripts
```

### Available Scripts

- `npm run build`: Build the extension
- `npm run clean`: Clean the dist directory
- `npm run watch`: Watch for changes and rebuild

### Technology Stack

- TypeScript
- Chrome Extension API
- Webpack
- i18n for internationalization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 