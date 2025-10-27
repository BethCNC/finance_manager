# Assets Organization Guide

## 📁 **Recommended Asset Structure**

```
public/
├── assets/
│   ├── banks/           # Bank-specific logos and icons
│   │   ├── secu/        # SECU logos and branding
│   │   ├── cash-app/    # Cash App logos and icons
│   │   ├── apple-cash/  # Apple Cash logos and icons
│   │   └── generic/     # Generic bank icons
│   ├── icons/           # General UI icons
│   │   ├── categories/  # Category-specific icons
│   │   ├── actions/     # Action icons (add, edit, delete)
│   │   └── status/      # Status icons (success, error, warning)
│   ├── logos/           # Company and service logos
│   │   ├── merchants/   # Merchant logos (Amazon, Starbucks, etc.)
│   │   ├── services/    # Service logos (Netflix, Spotify, etc.)
│   │   └── apps/        # App logos
│   └── images/          # General images
│       ├── backgrounds/ # Background images
│       ├── illustrations/ # Illustrations and graphics
│       └── photos/      # Photos
```

## 🏦 **Bank Assets Organization**

### **SECU (State Employees Credit Union)**
```
public/assets/banks/secu/
├── logo.png              # Main SECU logo
├── logo-white.png         # White version for dark backgrounds
├── logo-black.png         # Black version for light backgrounds
├── icon.png              # Small icon version
├── card-design.png        # Card design mockup
└── branding/             # Additional branding assets
    ├── colors.json       # Brand color palette
    └── guidelines.md     # Usage guidelines
```

### **Cash App**
```
public/assets/banks/cash-app/
├── logo.png              # Main Cash App logo
├── logo-square.png        # Square version
├── icon.png              # App icon
├── card-design.png        # Card design
└── branding/
    ├── colors.json
    └── guidelines.md
```

### **Apple Cash**
```
public/assets/banks/apple-cash/
├── logo.png              # Apple Cash logo
├── logo-white.png         # White version
├── icon.png              # App icon
├── card-design.png        # Card design
└── branding/
    ├── colors.json
    └── guidelines.md
```

## 🛍️ **Merchant Logos Organization**

```
public/assets/logos/merchants/
├── amazon.png
├── starbucks.png
├── uber.png
├── netflix.png
├── spotify.png
├── adobe.png
├── notion.png
├── chatgpt.png
└── generic/              # Generic merchant icons
    ├── restaurant.png
    ├── gas-station.png
    ├── grocery-store.png
    └── shopping.png
```

## 🎨 **Category Icons Organization**

```
public/assets/icons/categories/
├── food-groceries.png
├── dining-out.png
├── entertainment.png
├── transportation.png
├── shopping.png
├── subscriptions.png
├── healthcare.png
├── utilities.png
├── personal-care.png
├── insurance.png
├── income.png
├── transfer.png
└── other.png
```

## 📱 **Usage in React Components**

### **Importing Assets**
```typescript
// Bank logos
import secuLogo from '/assets/banks/secu/logo.png';
import cashAppLogo from '/assets/banks/cash-app/logo.png';
import appleCashLogo from '/assets/banks/apple-cash/logo.png';

// Merchant logos
import amazonLogo from '/assets/logos/merchants/amazon.png';
import starbucksLogo from '/assets/logos/merchants/starbucks.png';

// Category icons
import foodIcon from '/assets/icons/categories/food-groceries.png';
import diningIcon from '/assets/icons/categories/dining-out.png';
```

### **Using in Components**
```typescript
// Bank account cards
<img src={secuLogo} alt="SECU" className="w-8 h-8" />

// Merchant display
<img src={amazonLogo} alt="Amazon" className="w-6 h-6 rounded" />

// Category icons
<img src={foodIcon} alt="Food & Groceries" className="w-5 h-5" />
```

### **Dynamic Asset Loading**
```typescript
// Dynamic merchant logo loading
const getMerchantLogo = (merchant: string) => {
  const normalizedMerchant = merchant.toLowerCase().replace(/\s+/g, '-');
  return `/assets/logos/merchants/${normalizedMerchant}.png`;
};

// Fallback for missing logos
const MerchantLogo = ({merchant, className = "w-6 h-6"}) => {
  const [logoError, setLogoError] = useState(false);
  const logoPath = getMerchantLogo(merchant);
  
  return (
    <img 
      src={logoError ? '/assets/logos/merchants/generic.png' : logoPath}
      alt={merchant}
      className={className}
      onError={() => setLogoError(true)}
    />
  );
};
```

## 🎯 **Best Practices**

### **File Naming Conventions**
- Use lowercase with hyphens: `apple-cash-logo.png`
- Be descriptive: `secu-logo-white.png` not `logo2.png`
- Include size variants: `logo-small.png`, `logo-large.png`
- Use consistent extensions: `.png` for logos, `.jpg` for photos

### **Image Optimization**
- Use PNG for logos with transparency
- Use JPG for photos
- Optimize file sizes (aim for <100KB per logo)
- Use WebP format when possible for better compression

### **Responsive Images**
```typescript
// Responsive bank logos
const BankLogo = ({bank, size = 'medium'}) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  return (
    <img 
      src={`/assets/banks/${bank}/logo.png`}
      alt={bank}
      className={sizeMap[size]}
    />
  );
};
```

## 🚀 **Quick Setup Commands**

```bash
# Create the directory structure
mkdir -p public/assets/{banks/{secu,cash-app,apple-cash},icons/{categories,actions,status},logos/{merchants,services,apps},images/{backgrounds,illustrations,photos}}

# Add your assets to the appropriate directories
# Example:
# cp secu-logo.png public/assets/banks/secu/logo.png
# cp cash-app-logo.png public/assets/banks/cash-app/logo.png
# cp amazon-logo.png public/assets/logos/merchants/amazon.png
```

## 📋 **Asset Checklist**

### **Required Bank Assets**
- [ ] SECU logo (PNG with transparency)
- [ ] Cash App logo (PNG with transparency)  
- [ ] Apple Cash logo (PNG with transparency)
- [ ] Bank card mockups (optional but nice)

### **Required Merchant Assets**
- [ ] Amazon logo
- [ ] Starbucks logo
- [ ] Uber logo
- [ ] Netflix logo
- [ ] Spotify logo
- [ ] Adobe logo
- [ ] Notion logo
- [ ] ChatGPT logo

### **Required Category Assets**
- [ ] Food & Groceries icon
- [ ] Dining Out icon
- [ ] Entertainment icon
- [ ] Transportation icon
- [ ] Shopping icon
- [ ] Subscriptions icon
- [ ] Healthcare icon
- [ ] Utilities icon
- [ ] Personal Care icon
- [ ] Insurance icon
- [ ] Income icon
- [ ] Transfer icon

## 💡 **Pro Tips**

1. **Use SVG when possible** - Better scalability and smaller file sizes
2. **Create a fallback system** - Generic icons for missing merchant logos
3. **Optimize for web** - Compress images without losing quality
4. **Use consistent sizing** - Standardize icon sizes across the app
5. **Consider dark mode** - Provide both light and dark versions of logos

This structure will keep your assets organized and make them easy to use throughout your family finance manager app!
