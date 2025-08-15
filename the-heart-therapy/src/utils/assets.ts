import { NavigationType } from '@/types/navigation';

export const ASSET_PATHS = {
  icons: {
    about: '/images/icons/about.png',
    faq: '/images/icons/faq.png',
    fees: '/images/icons/fees.png',
    contact: '/images/icons/contact.png',
  },
  images: {
    logo: '/images/logo.png',
    testimonial: '/images/testimonial.png',
  },
} as const;

export const getIconPath = (type: NavigationType): string => {
  return ASSET_PATHS.icons[type];
};

export const getImagePath = (name: keyof typeof ASSET_PATHS.images): string => {
  return ASSET_PATHS.images[name];
};

// Asset preloading utility for performance
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadAssets = async (): Promise<void> => {
  const allPaths = [
    ...Object.values(ASSET_PATHS.icons),
    ...Object.values(ASSET_PATHS.images),
  ];

  try {
    await Promise.all(allPaths.map(preloadImage));
  } catch (error) {
    console.warn('Some assets failed to preload:', error);
  }
};
