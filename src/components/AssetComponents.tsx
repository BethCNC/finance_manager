import React, {useState} from 'react';

interface AssetImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  onError?: () => void;
}

export const AssetImage = ({src, alt, className = "w-6 h-6", fallback, onError}: AssetImageProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <img 
      src={hasError ? (fallback || '/assets/icons/generic.png') : src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

// Bank logo component
interface BankLogoProps {
  bank: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white' | 'black';
  className?: string;
}

export const BankLogo = ({bank, size = 'medium', variant = 'default', className}: BankLogoProps) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const variantSuffix = variant === 'default' ? '' : `-${variant}`;
  const src = `/assets/banks/${bank.toLowerCase().replace(/\s+/g, '-')}/logo${variantSuffix}.png`;
  const fallback = `/assets/banks/generic/bank-icon.png`;

  return (
    <AssetImage 
      src={src}
      alt={`${bank} logo`}
      className={`${sizeMap[size]} ${className || ''}`}
      fallback={fallback}
    />
  );
};

// Merchant logo component with color/monotone options
interface MerchantLogoProps {
  merchant: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'color' | 'monotone';
  className?: string;
}

export const MerchantLogo = ({merchant, size = 'small', variant = 'color', className}: MerchantLogoProps) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  // Normalize merchant name for file path
  const normalizedMerchant = merchant
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  const variantSuffix = variant === 'monotone' ? '-monotone' : '';
  const src = `/assets/logos/merchants/${normalizedMerchant}${variantSuffix}.png`;
  const fallback = `/assets/logos/merchants/generic${variantSuffix}.png`;

  return (
    <AssetImage 
      src={src}
      alt={`${merchant} logo`}
      className={`${sizeMap[size]} rounded ${className || ''}`}
      fallback={fallback}
    />
  );
};

// Category icon component
interface CategoryIconProps {
  category: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const CategoryIcon = ({category, size = 'small', className}: CategoryIconProps) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  // Map category names to icon files
  const categoryMap: Record<string, string> = {
    'Food & Groceries': 'food-groceries',
    'Dining Out': 'dining-out',
    'Entertainment': 'entertainment',
    'Transportation': 'transportation',
    'Shopping': 'shopping',
    'Subscriptions': 'subscriptions',
    'Healthcare': 'healthcare',
    'Utilities': 'utilities',
    'Personal Care': 'personal-care',
    'Insurance': 'insurance',
    'Income': 'income',
    'Transfer': 'transfer',
    'Other': 'other'
  };

  const iconName = categoryMap[category] || 'other';
  const src = `/assets/icons/categories/${iconName}.png`;
  const fallback = '/assets/icons/categories/other.png';

  return (
    <AssetImage 
      src={src}
      alt={`${category} icon`}
      className={`${sizeMap[size]} ${className || ''}`}
      fallback={fallback}
    />
  );
};

// Utility function to get asset path
export const getAssetPath = (type: 'bank' | 'merchant' | 'category', name: string, variant?: string) => {
  const normalizedName = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  switch (type) {
    case 'bank':
      const bankVariantSuffix = variant ? `-${variant}` : '';
      return `/assets/banks/${normalizedName}/logo${bankVariantSuffix}.png`;
    
    case 'merchant':
      const merchantVariantSuffix = variant === 'monotone' ? '-monotone' : '';
      return `/assets/logos/merchants/${normalizedName}${merchantVariantSuffix}.png`;
    
    case 'category':
      const categoryMap: Record<string, string> = {
        'food-groceries': 'food-groceries',
        'dining-out': 'dining-out',
        'entertainment': 'entertainment',
        'transportation': 'transportation',
        'shopping': 'shopping',
        'subscriptions': 'subscriptions',
        'healthcare': 'healthcare',
        'utilities': 'utilities',
        'personal-care': 'personal-care',
        'insurance': 'insurance',
        'income': 'income',
        'transfer': 'transfer',
        'other': 'other'
      };
      const iconName = categoryMap[normalizedName] || 'other';
      return `/assets/icons/categories/${iconName}.png`;
    
    default:
      return '/assets/icons/generic.png';
  }
};

// Predefined asset paths for common items
export const ASSET_PATHS = {
  banks: {
    secu: '/assets/banks/secu/logo.png',
    'cash-app': '/assets/banks/cash-app/logo.png',
    'apple-cash': '/assets/banks/apple-cash/logo.png'
  },
  merchants: {
    // Color versions
    amazon: '/assets/logos/merchants/amazon.png',
    apple: '/assets/logos/merchants/apple.png',
    netflix: '/assets/logos/merchants/netflix.png',
    hulu: '/assets/logos/merchants/hulu.png',
    adobe: '/assets/logos/merchants/adobe.png',
    figma: '/assets/logos/merchants/figma.png',
    'claude-ai': '/assets/logos/merchants/claude-ai.png',
    doordash: '/assets/logos/merchants/doordash.png',
    'uber-eats': '/assets/logos/merchants/uber-eats.png',
    'burger-king': '/assets/logos/merchants/burger-king.png',
    'taco-bell': '/assets/logos/merchants/taco-bell.png',
    walmart: '/assets/logos/merchants/walmart.png',
    instacart: '/assets/logos/merchants/instacart.png',
    'cash-app': '/assets/logos/merchants/cash-app.png',
    'blue-cross-nc': '/assets/logos/merchants/blue-cross-nc.png',
    // Monotone versions
    'amazon-monotone': '/assets/logos/merchants/amazon-monotone.png',
    'apple-monotone': '/assets/logos/merchants/apple-monotone.png',
    'netflix-monotone': '/assets/logos/merchants/netflix-monotone.png',
    'hulu-monotone': '/assets/logos/merchants/hulu-monotone.png',
    'adobe-monotone': '/assets/logos/merchants/adobe-monotone.png',
    'figma-monotone': '/assets/logos/merchants/figma-monotone.png',
    'claude-ai-monotone': '/assets/logos/merchants/claude-ai-monotone.png',
    'doordash-monotone': '/assets/logos/merchants/doordash-monotone.png',
    'uber-eats-monotone': '/assets/logos/merchants/uber-eats-monotone.png',
    'burger-king-monotone': '/assets/logos/merchants/burger-king-monotone.png',
    'taco-bell-monotone': '/assets/logos/merchants/taco-bell-monotone.png',
    'walmart-monotone': '/assets/logos/merchants/walmart-monotone.png',
    'instacart-monotone': '/assets/logos/merchants/instacart-monotone.png',
    'cash-app-monotone': '/assets/logos/merchants/cash-app-monotone.png',
    'blue-cross-nc-monotone': '/assets/logos/merchants/blue-cross-nc-monotone.png'
  },
  categories: {
    'food-groceries': '/assets/icons/categories/food-groceries.png',
    'dining-out': '/assets/icons/categories/dining-out.png',
    'entertainment': '/assets/icons/categories/entertainment.png',
    'transportation': '/assets/icons/categories/transportation.png',
    'shopping': '/assets/icons/categories/shopping.png',
    'subscriptions': '/assets/icons/categories/subscriptions.png',
    'healthcare': '/assets/icons/categories/healthcare.png',
    'utilities': '/assets/icons/categories/utilities.png',
    'personal-care': '/assets/icons/categories/personal-care.png',
    'insurance': '/assets/icons/categories/insurance.png',
    'income': '/assets/icons/categories/income.png',
    'transfer': '/assets/icons/categories/transfer.png',
    'other': '/assets/icons/categories/other.png'
  }
} as const;
