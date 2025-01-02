/// <reference types="chrome"/>
import { getString } from './i18n';

interface ProductInfo {
  origin: string;
  manufacturer: string;
  seller: string;
  delivery: string;
}

// Update DOM element content
function updateElement(id: string, content: string) {
  const element = document.getElementById(id);
  console.log(`[Amazon Info Plus] Updating element ${id} with content: ${content}`);
  if (element) {
    element.textContent = content || getString('notFound');
  }
}

// Initialize label texts
function initializeLabels() {
  const labels = {
    'origin-label': getString('origin'),
    'manufacturer-label': getString('manufacturer'),
    'seller-label': getString('seller'),
    'delivery-label': getString('delivery')
  };

  Object.entries(labels).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  });

  // Initialize all values to "Loading..."
  ['origin', 'manufacturer', 'seller', 'delivery'].forEach(id => {
    updateElement(id, getString('loading'));
  });
}

// Check if current page is a product page
function isAmazonProductPage(url: string): boolean {
  const isProduct = url.includes('/dp/') || url.includes('/gp/product/');
  console.log(`[Amazon Info Plus] Checking URL: ${url}, is product page: ${isProduct}`);
  return isProduct;
}

// Get current tab product information
async function getCurrentTabInfo() {
  console.log('[Amazon Info Plus] Getting current tab info');
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = tabs[0];
  console.log('[Amazon Info Plus] Current tab:', currentTab);
  
  if (currentTab?.id && currentTab.url && isAmazonProductPage(currentTab.url)) {
    try {
      console.log('[Amazon Info Plus] Sending message to content script');
      const response = await chrome.tabs.sendMessage(currentTab.id, { action: 'getProductInfo' }) as ProductInfo;
      console.log('[Amazon Info Plus] Received response:', response);
      updateElement('origin', response.origin);
      updateElement('manufacturer', response.manufacturer);
      updateElement('seller', response.seller);
      updateElement('delivery', response.delivery);
    } catch (error) {
      console.error('[Amazon Info Plus] Failed to get product info:', error);
      updateElement('origin', getString('loadFailed'));
      updateElement('manufacturer', getString('loadFailed'));
      updateElement('seller', getString('loadFailed'));
      updateElement('delivery', getString('loadFailed'));
    }
  } else {
    console.log('[Amazon Info Plus] Not a product page or invalid tab');
    updateElement('origin', getString('notProductPage'));
    updateElement('manufacturer', getString('notProductPage'));
    updateElement('seller', getString('notProductPage'));
    updateElement('delivery', getString('notProductPage'));
  }
}

// Initialize UI and get information when popup opens
console.log('[Amazon Info Plus] Popup script loaded');
document.addEventListener('DOMContentLoaded', () => {
  initializeLabels();
  getCurrentTabInfo();
}); 