interface I18nStrings {
  origin: string;
  manufacturer: string;
  seller: string;
  delivery: string;
  loading: string;
  notFound: string;
  notProductPage: string;
  loadFailed: string;
}

const i18n: { [key: string]: I18nStrings } = {
  'en': {
    origin: 'Origin',
    manufacturer: 'Manufacturer',
    seller: 'Seller',
    delivery: 'Delivery',
    loading: 'Loading...',
    notFound: 'Not Found',
    notProductPage: 'Not a Product Page',
    loadFailed: 'Failed to Load'
  },
  'ja': {
    origin: '原産国',
    manufacturer: 'メーカー',
    seller: '販売元',
    delivery: '配送情報',
    loading: '読み込み中...',
    notFound: '見つかりません',
    notProductPage: '商品ページではありません',
    loadFailed: '取得に失敗しました'
  },
  'zh': {
    origin: '产地',
    manufacturer: '厂商',
    seller: '销售方',
    delivery: '配送方式',
    loading: '加载中...',
    notFound: '未找到',
    notProductPage: '非商品页面',
    loadFailed: '获取失败'
  }
};

export function getLanguage(): string {
  // Get browser language setting
  const lang = navigator.language.toLowerCase().split('-')[0];
  // If the language is not supported, use Japanese as default
  return i18n[lang] ? lang : 'ja';
}

export function getString(key: keyof I18nStrings): string {
  const lang = getLanguage();
  return i18n[lang][key];
}

export const currentLang = getLanguage(); 