/// <reference types="chrome"/>
import { getString } from './i18n';

interface ProductInfo {
  origin: string;
  manufacturer: string;
  seller: string;
  delivery: string;
}

class AmazonProductInfoExtractor {
  private getTextContent(selector: string): string {
    const element = document.querySelector(selector);
    console.log(`[Amazon Info Plus] Searching for selector: ${selector}, found: ${element ? 'yes' : 'no'}`);
    return element ? element.textContent?.trim() || '' : '';
  }

  private findInTable(keyword: string): string {
    const rows = document.querySelectorAll('tr');
    for (const row of rows) {
      const text = row.textContent || '';
      if (text.includes(keyword)) {
        console.log(`[Amazon Info Plus] Found ${keyword} in table:`, text);
        return text.replace(keyword, '').trim();
      }
    }
    return '';
  }

  private findInProductDetails(): string {
    // Search in product details section
    const detailBullets = document.querySelector('#detailBullets_feature_div');
    if (detailBullets) {
      const items = detailBullets.querySelectorAll('li');
      for (const item of items) {
        const text = item.textContent || '';
        if (text.includes('原産国') || text.includes('製造国')) {
          console.log('[Amazon Info Plus] Found origin in detail bullets:', text);
          return text.split(':')[1]?.trim() || '';
        }
      }
    }
    return '';
  }

  private findInTechSpecs(): string {
    // Search in technical specifications section
    const techSpecs = document.querySelector('#productDetails_techSpec_section_1');
    if (techSpecs) {
      const rows = techSpecs.querySelectorAll('tr');
      for (const row of rows) {
        const text = row.textContent || '';
        if (text.includes('原産国') || text.includes('製造国')) {
          console.log('[Amazon Info Plus] Found origin in tech specs:', text);
          return text.replace('原産国', '').replace('製造国', '').trim();
        }
      }
    }
    return '';
  }

  private findSellerInfo(): string {
    // Try to get seller information from multiple locations
    const merchantInfo = document.querySelector('#merchant-info');
    if (merchantInfo) {
      const text = merchantInfo.textContent || '';
      console.log('[Amazon Info Plus] Found merchant info:', text);
      return text.trim();
    }

    // Try to get seller information from tabular-buybox
    const buyBox = document.querySelector('#tabular-buybox');
    if (buyBox) {
      const rows = buyBox.querySelectorAll('tr');
      for (const row of rows) {
        const text = row.textContent || '';
        if (text.includes('販売元')) {
          console.log('[Amazon Info Plus] Found seller in buybox:', text);
          return text.replace('販売元', '').trim();
        }
      }
    }

    return '';
  }

  private findDeliveryInfo(): string {
    // Try to get delivery information
    const deliveryBlock = document.querySelector('#deliveryBlockMessage');
    if (deliveryBlock) {
      const text = deliveryBlock.textContent || '';
      console.log('[Amazon Info Plus] Found delivery info:', text);
      return text.trim();
    }

    // Try to get Prime delivery information
    const primeDelivery = document.querySelector('#primeDeliveryMessage_feature_div');
    if (primeDelivery) {
      const text = primeDelivery.textContent || '';
      console.log('[Amazon Info Plus] Found prime delivery info:', text);
      return text.trim();
    }

    return '';
  }

  public extractProductInfo(): ProductInfo {
    console.log('[Amazon Info Plus] Extracting product information...');
    
    // Try to find origin information from multiple locations
    const origin = this.findInTable('原産国') || 
                  this.findInTable('製造国') ||
                  this.findInProductDetails() ||
                  this.findInTechSpecs();

    // Get manufacturer information
    const manufacturer = this.getTextContent('#bylineInfo') || 
                        this.getTextContent('#brand') ||
                        this.findInTable('メーカー');

    const info = {
      origin: origin || getString('notFound'),
      manufacturer: manufacturer || getString('notFound'),
      seller: this.findSellerInfo() || getString('notFound'),
      delivery: this.findDeliveryInfo() || getString('notFound')
    };

    console.log('[Amazon Info Plus] Extracted info:', info);
    return info;
  }
}

// Check if current page is a product page
function isProductPage(): boolean {
  const url = window.location.href;
  const isProduct = url.includes('/dp/') || url.includes('/gp/product/');
  console.log(`[Amazon Info Plus] Current URL: ${url}, is product page: ${isProduct}`);
  return isProduct;
}

// Create information popup
function createInfoPopup(info: ProductInfo) {
  // Remove existing popup if any
  const existingPopup = document.getElementById('amazon-info-plus-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement('div');
  popup.id = 'amazon-info-plus-popup';
  popup.style.cssText = `
    position: fixed;
    right: 80px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 9998;
    width: 300px;
  `;

  // Add click event handler to prevent closing when clicking inside popup
  popup.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  const createInfoItem = (label: string, value: string) => {
    const container = document.createElement('div');
    container.style.marginBottom = '15px';
    
    const labelElement = document.createElement('div');
    labelElement.textContent = label;
    labelElement.style.fontWeight = 'bold';
    labelElement.style.color = '#232F3E';
    labelElement.style.marginBottom = '5px';
    
    const valueElement = document.createElement('div');
    valueElement.textContent = value || getString('notFound');
    valueElement.style.padding = '8px';
    valueElement.style.backgroundColor = '#f8f8f8';
    valueElement.style.borderRadius = '4px';
    
    container.appendChild(labelElement);
    container.appendChild(valueElement);
    return container;
  };

  popup.appendChild(createInfoItem(getString('origin'), info.origin));
  popup.appendChild(createInfoItem(getString('manufacturer'), info.manufacturer));
  popup.appendChild(createInfoItem(getString('seller'), info.seller));
  popup.appendChild(createInfoItem(getString('delivery'), info.delivery));

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
  `;
  closeButton.onclick = (event) => {
    event.stopPropagation();
    popup.remove();
    removeClickOutsideHandler();
  };
  popup.appendChild(closeButton);

  document.body.appendChild(popup);

  // Add click outside handler
  const handleClickOutside = (event: MouseEvent) => {
    const popup = document.getElementById('amazon-info-plus-popup');
    const button = document.getElementById('amazon-info-plus-logo');
    
    // Check if click is outside both popup and button
    if (popup && 
        !popup.contains(event.target as Node) && 
        button && 
        !button.contains(event.target as Node)) {
      popup.remove();
      removeClickOutsideHandler();
    }
  };

  // Add document click listener
  document.addEventListener('click', handleClickOutside);

  // Function to remove click outside handler
  function removeClickOutsideHandler() {
    document.removeEventListener('click', handleClickOutside);
  }
}

// Create fixed position Logo button
function createLogoButton() {
  // Only create button on product pages
  if (!isProductPage()) {
    console.log('[Amazon Info Plus] Not a product page, skipping button creation');
    return;
  }

  console.log('[Amazon Info Plus] Creating Info+ button');
  const button = document.createElement('button');
  button.id = 'amazon-info-plus-logo';
  button.style.cssText = `
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9999;
    padding: 10px;
    border-radius: 50%;
    background: #232F3E;
    color: white;
    border: none;
    cursor: pointer;
  `;
  button.innerHTML = 'Info+';

  // Add click event handler
  button.onclick = () => {
    console.log('[Amazon Info Plus] Button clicked');
    const extractor = new AmazonProductInfoExtractor();
    const info = extractor.extractProductInfo();
    createInfoPopup(info);
  };

  document.body.appendChild(button);
  console.log('[Amazon Info Plus] Button created and added to page');
}

// Initialize
console.log('[Amazon Info Plus] Content script loaded');
createLogoButton();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((
  request: { action: string },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ProductInfo) => void
) => {
  console.log('[Amazon Info Plus] Received message:', request);
  if (request.action === 'getProductInfo' && isProductPage()) {
    const extractor = new AmazonProductInfoExtractor();
    const info = extractor.extractProductInfo();
    console.log('[Amazon Info Plus] Sending response:', info);
    sendResponse(info);
  }
}); 