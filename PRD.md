# Product Requirements Document (PRD)

## Product Name
Amazon Info Plus - Chrome Extension for Amazon Product Information

## Background and Objectives
When shopping on Amazon, many users want to quickly understand product information such as delivery method, seller, and manufacturer to make more informed purchasing decisions. This product aims to help users instantly access this key information while browsing Amazon products through a simple and user-friendly Chrome extension.

## Target Users
- Primary users: Frequent Amazon shoppers, especially those who are particular about delivery methods and seller information.

## Functional Requirements
### Core Features
1. Support identifying and displaying the following information:
   - Product manufacturer
   - Product seller
   - Delivery method
2. **First version limitation: Only supports Amazon Japan site (https://www.amazon.co.jp).**
3. Multi-language support:
   - English
   - Japanese (default)

### Extension Interface
1. Extension icon displayed in Chrome toolbar
2. Button displayed on product pages that opens an information window when clicked
3. Information window automatically closes when clicking elsewhere on the page

### Non-functional Requirements
- **Performance**: Information extraction should complete within 2 seconds
- **Compatibility**: Supports latest versions of Chrome browser
- **User Experience**:
  - Clean extension interface that highlights key information
  - Smooth operation with no noticeable lag
  - Automatically switches display language based on browser settings

## User Interaction Design
1. **Info Button**:
   - Location: On product pages
   - Click behavior: Opens a popup window
   - Click outside: Closes the popup

2. **Popup Content**:
   - Product manufacturer
   - Product seller
   - Delivery method

## Technical Requirements
- Language and Framework:
  - Developed using TypeScript
  - Uses Chrome Extension API
  - Built with Webpack
- Data Source: Parses Amazon page DOM to extract relevant information
- Internationalization: Uses i18n for multi-language support

## Acceptance Criteria
1. Extension correctly identifies and displays product manufacturer, seller, and delivery method
2. Extension interface layout follows design specifications
3. Information extraction response time does not exceed 2 seconds
4. No compatibility issues with latest Chrome browser versions
5. Correctly responds to user interactions (click to open/close)
6. Correctly displays language based on browser settings

## Appendix
- [Chrome Extension Development Documentation](https://developer.chrome.com/docs/extensions/)
- [Amazon Page Structure Reference](https://www.amazon.co.jp)
