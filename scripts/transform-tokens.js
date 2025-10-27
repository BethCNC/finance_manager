/**
 * Token Transformation Script
 * Converts tokens.json (Token Studio format) → CSS Variables + Tailwind Config
 * 
 * Run: node scripts/transform-tokens.js
 */

const fs = require('fs');
const path = require('path');

// Load tokens.json
const tokensPath = path.join(__dirname, '../tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Helper: Resolve token references like "{Blue.50}" → actual color value
function resolveTokenValue(value, tokens) {
  if (typeof value !== 'string') return value;
  
  // Check if it's a token reference
  const referenceMatch = value.match(/^\{(.+)\}$/);
  if (!referenceMatch) return value;
  
  const referencePath = referenceMatch[1].split('.');
  let resolved = tokens;
  
  // Special handling: if path doesn't start with a top-level key, try "Tailwind Colors" first
  const topLevelKeys = Object.keys(tokens);
  if (!topLevelKeys.includes(referencePath[0])) {
    // Try looking in "Tailwind Colors"
    if (tokens['Tailwind Colors'] && tokens['Tailwind Colors'][referencePath[0]]) {
      resolved = tokens['Tailwind Colors'];
    }
    // Special case for "colors.Red" references
    else if (referencePath[0] === 'colors' && tokens['Tailwind Colors'] && tokens['Tailwind Colors'].colors) {
      resolved = tokens['Tailwind Colors'];
    }
  }
  
  for (const key of referencePath) {
    if (!resolved[key]) {
      console.warn(`⚠️  Could not resolve token reference: ${value}`);
      return value;
    }
    resolved = resolved[key];
  }
  
  // If resolved is an object with $value, return that
  if (resolved && typeof resolved === 'object' && resolved.$value) {
    // Recursively resolve in case it references another token
    return resolveTokenValue(resolved.$value, tokens);
  }
  
  return resolved;
}

// Helper: Convert nested object to CSS variable name
// Example: Brand.primary.bg-subtle → --brand-primary-bg-subtle
function toCSSVariableName(path) {
  return '--' + path
    .map(p => p.toLowerCase().replace(/[^a-z0-9]/g, '-'))
    .join('-');
}

// Helper: Extract all color tokens recursively
function extractTokens(obj, currentPath = [], type = null) {
  const results = [];
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip metadata and theme info
    if (key === '$themes' || key === '$metadata') continue;
    
    if (value && typeof value === 'object') {
      // If it has $type and $value, it's a token
      if (value.$type && value.$value !== undefined) {
        const tokenPath = [...currentPath, key];
        const tokenType = value.$type;
        const tokenValue = resolveTokenValue(value.$value, tokens);
        
        results.push({
          path: tokenPath,
          type: tokenType,
          value: tokenValue,
          cssVarName: toCSSVariableName(tokenPath)
        });
      } else {
        // Recurse into nested objects
        results.push(...extractTokens(value, [...currentPath, key], type));
      }
    }
  }
  
  return results;
}

// Generate CSS variables
function generateCSSVariables(tokens) {
  const colorTokens = tokens.filter(t => t.type === 'color');
  const dimensionTokens = tokens.filter(t => t.type === 'dimension');
  const shadowTokens = tokens.filter(t => t.type === 'boxShadow');
  
  let css = `/**
 * Design Tokens - Auto-generated from tokens.json
 * DO NOT EDIT MANUALLY - Run 'npm run tokens:build' to regenerate
 * Source: Token Studio for Figma
 */

:root {
  /* ============================================
     COLORS
     ============================================ */
`;

  // Brand colors
  const brandColors = colorTokens.filter(t => t.path[0] === 'Brand');
  if (brandColors.length) {
    css += `\n  /* Brand Colors */\n`;
    brandColors.forEach(token => {
      css += `  ${token.cssVarName}: ${token.value};\n`;
    });
  }

  // Semantic colors
  const semanticColors = colorTokens.filter(t => t.path[0] === 'Semantic');
  if (semanticColors.length) {
    css += `\n  /* Semantic Colors */\n`;
    semanticColors.forEach(token => {
      css += `  ${token.cssVarName}: ${token.value};\n`;
    });
  }

  // Tailwind palette colors
  const paletteColors = colorTokens.filter(t => t.path[0] === 'Tailwind Colors');
  if (paletteColors.length) {
    css += `\n  /* Tailwind Color Palette */\n`;
    paletteColors.forEach(token => {
      css += `  ${token.cssVarName}: ${token.value};\n`;
    });
  }

  // Dimensions
  css += `\n  /* ============================================
     DIMENSIONS
     ============================================ */\n`;
  
  // Spacing
  const spacingTokens = dimensionTokens.filter(t => t.path[1] === 'spacing');
  if (spacingTokens.length) {
    css += `\n  /* Spacing */\n`;
    spacingTokens.forEach(token => {
      css += `  ${token.cssVarName}: ${token.value};\n`;
    });
  }

  // Border Radius
  const radiusTokens = dimensionTokens.filter(t => t.path[1] === 'borderRadius');
  if (radiusTokens.length) {
    css += `\n  /* Border Radius */\n`;
    radiusTokens.forEach(token => {
      css += `  ${token.cssVarName}: ${token.value};\n`;
    });
  }

  // Border Width
  const borderWidthTokens = dimensionTokens.filter(t => t.path[1] === 'borderWidth');
  if (borderWidthTokens.length) {
    css += `\n  /* Border Width */\n`;
    borderWidthTokens.forEach(token => {
      css += `  ${token.cssVarName}: ${token.value};\n`;
    });
  }

  css += `}\n`;
  
  return css;
}

// Generate Tailwind config object
function generateTailwindConfig(tokens) {
  const config = {
    colors: {},
    spacing: {},
    borderRadius: {},
    fontSize: {}
  };

  // Process Brand colors for Tailwind
  tokens
    .filter(t => t.type === 'color' && t.path[0] === 'Brand')
    .forEach(token => {
      const [_, group, ...rest] = token.path;
      const key = rest.join('-');
      
      if (!config.colors[group]) {
        config.colors[group] = {};
      }
      
      config.colors[group][key] = `var(${token.cssVarName})`;
    });

  // Process Semantic colors
  tokens
    .filter(t => t.type === 'color' && t.path[0] === 'Semantic')
    .forEach(token => {
      const [_, group, ...rest] = token.path;
      const key = rest.join('-');
      
      if (!config.colors[group]) {
        config.colors[group] = {};
      }
      
      config.colors[group][key] = `var(${token.cssVarName})`;
    });

  // Process spacing
  tokens
    .filter(t => t.type === 'dimension' && t.path[1] === 'spacing')
    .forEach(token => {
      const key = token.path[2];
      config.spacing[key] = `var(${token.cssVarName})`;
    });

  // Process border radius
  tokens
    .filter(t => t.type === 'dimension' && t.path[1] === 'borderRadius')
    .forEach(token => {
      const key = token.path[2].replace('rounded-', '');
      config.borderRadius[key] = `var(${token.cssVarName})`;
    });

  return config;
}

// Main execution
console.log('🎨 Transforming tokens.json...\n');

// Extract all tokens
const allTokens = extractTokens(tokens);
console.log(`✓ Extracted ${allTokens.length} tokens`);

// Generate CSS variables
const cssVariables = generateCSSVariables(allTokens);
const cssOutputPath = path.join(__dirname, '../src/tokens.css');
fs.writeFileSync(cssOutputPath, cssVariables);
console.log(`✓ Generated CSS variables → ${cssOutputPath}`);

// Generate Tailwind config snippet
const tailwindConfig = generateTailwindConfig(allTokens);
const configOutputPath = path.join(__dirname, '../src/tokens.tailwind.json');
fs.writeFileSync(configOutputPath, JSON.stringify(tailwindConfig, null, 2));
console.log(`✓ Generated Tailwind config → ${configOutputPath}`);

// Generate token reference documentation
const tokenDocs = `# Design Tokens Reference

Auto-generated from tokens.json

## Token Counts
- Total Tokens: ${allTokens.length}
- Color Tokens: ${allTokens.filter(t => t.type === 'color').length}
- Dimension Tokens: ${allTokens.filter(t => t.type === 'dimension').length}

## Brand Colors

${allTokens
  .filter(t => t.type === 'color' && t.path[0] === 'Brand')
  .map(t => `- \`${t.cssVarName}\`: ${t.value}`)
  .join('\n')}

## Semantic Colors

${allTokens
  .filter(t => t.type === 'color' && t.path[0] === 'Semantic')
  .map(t => `- \`${t.cssVarName}\`: ${t.value}`)
  .join('\n')}

## Spacing Scale

${allTokens
  .filter(t => t.type === 'dimension' && t.path[1] === 'spacing')
  .slice(0, 20) // First 20
  .map(t => `- \`${t.cssVarName}\`: ${t.value}`)
  .join('\n')}

... and more

## Usage in CSS

\`\`\`css
.my-component {
  background-color: var(--brand-primary-bg);
  color: var(--brand-fg-text);
  padding: var(--dimensions-spacing-4);
  border-radius: var(--dimensions-borderradius-rounded-md);
}
\`\`\`

## Usage in Tailwind

\`\`\`jsx
<div className="bg-primary-bg text-fg-text p-4 rounded-md">
  Token-based styling
</div>
\`\`\`
`;

const docsOutputPath = path.join(__dirname, '../docs/TOKENS.md');
fs.writeFileSync(docsOutputPath, tokenDocs);
console.log(`✓ Generated documentation → ${docsOutputPath}`);

console.log('\n✅ Token transformation complete!\n');
console.log('Next steps:');
console.log('1. Import tokens.css in globals.css');
console.log('2. Update tailwind.config.js to use tokens.tailwind.json');
console.log('3. Update components to use semantic token classes\n');

