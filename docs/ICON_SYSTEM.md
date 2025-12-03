# 🎨 Automated Icon Generation System

## Overview

This system automatically converts SVG files exported from Figma into type-safe React Native components with full TypeScript support and NativeWind integration.

**Key Features:**
- ✅ **One command** to generate all icons
- ✅ **TypeScript** with full type safety
- ✅ **Customizable** size and color props
- ✅ **NativeWind** className support
- ✅ **Optimized** SVG output
- ✅ **Auto-generated** index file for easy imports

---

## 🚀 Quick Start

### 1. Export SVGs from Figma

1. Select your icon in Figma
2. Right-click → **Copy as SVG**
3. Paste into a text editor
4. Save as `.svg` file in `assets/icons/` directory

**Naming Convention:**
```
✅ home.svg        → HomeIcon component
✅ profile.svg     → ProfileIcon component  
✅ search-bar.svg  → SearchBarIcon component
✅ arrow_left.svg  → ArrowLeftIcon component

❌ Home.svg        → Avoid capital letters
❌ home icon.svg   → Avoid spaces
```

### 2. Generate Components

```bash
npm run icons:generate
```

This will:
- ✅ Convert all `.svg` files in `assets/icons/`
- ✅ Generate TypeScript components in `src/components/icons/`
- ✅ Create `index.ts` with all exports
- ✅ Optimize and format the code

### 3. Use in Your App

```tsx
import { HomeIcon, ProfileIcon, SearchIcon } from '@/components/icons';

function MyComponent() {
  return (
    <View>
      {/* Basic usage */}
      <HomeIcon />
      
      {/* Custom size and color */}
      <ProfileIcon size={32} color="#009FE3" />
      
      {/* With NativeWind */}
      <SearchIcon size={20} className="text-primary" />
    </View>
  );
}
```

---

## 📦 NPM Scripts

### `npm run icons:generate`
Generates React Native components from SVG files.

**Process:**
1. Checks `assets/icons/` for `.svg` files
2. Runs SVGR with custom template
3. Outputs to `src/components/icons/`
4. Generates `index.ts` barrel export

**Output:**
```
src/components/icons/
├── HomeIcon.tsx
├── ProfileIcon.tsx
├── SearchIcon.tsx
└── index.ts         # Auto-generated exports
```

### `npm run icons:clean`
Removes all generated icon components.

**Use case:** Clean slate before regenerating icons.

```bash
npm run icons:clean
npm run icons:generate
```

---

## 🎯 Component API

All generated icon components have the same consistent API:

```tsx
interface IconProps extends SvgProps {
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number;
  
  /**
   * Icon color (fill/stroke)
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * NativeWind className for styling
   */
  className?: string;
}
```

### Usage Examples

**1. Default (24px, currentColor)**
```tsx
<HomeIcon />
```

**2. Custom Size**
```tsx
<HomeIcon size={32} />
<ProfileIcon size={16} />
```

**3. Custom Color**
```tsx
<HomeIcon color="#009FE3" />
<HomeIcon color="rgb(0, 159, 227)" />
```

**4. With Design System Colors**
```tsx
import { colors } from '@/theme';

<HomeIcon color={colors.primary} />
```

**5. With NativeWind (CSS Variables)**
```tsx
<HomeIcon className="text-primary" />
<HomeIcon className="text-[--color-primary]" />
```

**6. With NativeWind vars() API**
```tsx
import { vars } from 'nativewind';

<View style={vars({ '--icon-color': dynamicColor })}>
  <HomeIcon className="text-[--icon-color]" />
</View>
```

**7. All SvgProps Supported**
```tsx
<HomeIcon 
  size={24}
  color="#009FE3"
  opacity={0.8}
  strokeWidth={2}
  transform="rotate(45)"
/>
```

---

## 🛠️ Configuration

### SVGR Config (`svgr.config.js`)

Controls how SVG files are transformed:

```js
module.exports = {
  native: true,           // React Native mode
  typescript: true,       // Generate .tsx files
  dimensions: false,      // Remove hardcoded sizes
  
  svgProps: {
    width: '{size}',      // Dynamic size prop
    height: '{size}',
  },
  
  replaceAttrValues: {
    '#000': '{color}',    // Replace black with color prop
    '#000000': '{color}',
  },
};
```

### Custom Template (`svgr.template.js`)

Defines the component structure:

- Adds TypeScript interfaces
- Injects `size` and `color` props
- Adds `className` support
- Includes JSDoc comments

---

## 📋 Best Practices

### ✅ DO: Optimize SVGs Before Export

**In Figma:**
1. Use **Auto Layout** for consistent bounds
2. **Flatten** complex vector networks
3. Use **Union** for compound shapes
4. Remove unnecessary **effects** (blur, shadow)
5. Export at **1x** (SVG is scalable!)

**After Export:**
Use [SVGOMG](https://jakearchibald.github.io/svgomg/) to optimize:
- ✅ Keep `viewBox` attribute (critical!)
- ✅ Remove `width`/`height` attributes
- ✅ Minify path data
- ✅ Remove unused definitions

### ✅ DO: Use Consistent Naming

```
✅ home.svg, profile.svg, search.svg
❌ Home.svg, UserProfile.svg, search_icon.svg
```

### ✅ DO: Use Design System Colors

```tsx
// ✅ GOOD - Dynamic with theme
import { colors } from '@/theme';
<HomeIcon color={colors.primary} />

// ❌ AVOID - Hardcoded color
<HomeIcon color="#009FE3" />
```

### ✅ DO: Leverage NativeWind

```tsx
// ✅ PERFECT - Responsive to theme
<HomeIcon className="text-primary" />

// ✅ GOOD - Dynamic with vars()
<View style={vars({ '--color': themeColor })}>
  <HomeIcon className="text-[--color]" />
</View>
```

### ❌ DON'T: Edit Generated Files

All files in `src/components/icons/` are **auto-generated**.

```tsx
// ❌ WRONG - Changes will be lost!
// Editing HomeIcon.tsx directly

// ✅ RIGHT - Wrap in custom component
const CustomHomeIcon = (props) => (
  <HomeIcon {...props} color="blue" />
);
```

### ❌ DON'T: Mix SVG Formats

All icons should come from the same source (Figma) for consistency.

```
❌ AVOID mixing:
  - Figma exports
  - Downloaded icon packs
  - Hand-coded SVGs
  - Different design styles
```

---

## 🔄 Workflow

### Adding New Icons

1. **Export from Figma** → `assets/icons/new-icon.svg`
2. **Generate**: `npm run icons:generate`
3. **Import**: `import { NewIcon } from '@/components/icons'`
4. **Use**: `<NewIcon size={24} />`

### Updating Existing Icons

1. **Replace SVG** in `assets/icons/icon-name.svg`
2. **Regenerate**: `npm run icons:generate`
3. Components automatically updated!

### Removing Icons

1. **Delete SVG** from `assets/icons/`
2. **Regenerate**: `npm run icons:generate`
3. Unused component removed from `src/components/icons/`

---

## 🎓 Advanced Patterns

### Icon Wrapper Component

Create a universal `Icon` component:

```tsx
// src/components/ui/Icon.tsx
import * as Icons from '@/components/icons';
import { vars } from 'nativewind';

type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({ name, size = 24, color, className }: IconProps) => {
  const IconComponent = Icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <View 
      style={color ? vars({ '--icon-color': color }) : undefined}
      className={className}
    >
      <IconComponent 
        size={size} 
        color={color || 'currentColor'} 
      />
    </View>
  );
};

// Usage with string-based icon names
<Icon name="HomeIcon" size={32} color="#009FE3" />
```

### Dynamic Icon Loading

```tsx
const iconMap: Record<string, React.ComponentType<any>> = {
  home: HomeIcon,
  profile: ProfileIcon,
  search: SearchIcon,
};

function DynamicIcon({ type }: { type: string }) {
  const Icon = iconMap[type];
  return Icon ? <Icon size={24} /> : null;
}
```

### Icon with Badge

```tsx
function IconWithBadge({ 
  IconComponent, 
  badgeCount 
}: { 
  IconComponent: React.ComponentType<any>;
  badgeCount: number;
}) {
  return (
    <View className="relative">
      <IconComponent size={24} />
      {badgeCount > 0 && (
        <View className="absolute -top-1 -right-1 bg-error rounded-full px-1">
          <Text className="text-xs text-white">{badgeCount}</Text>
        </View>
      )}
    </View>
  );
}

<IconWithBadge IconComponent={HomeIcon} badgeCount={5} />
```

---

## 🐛 Troubleshooting

### Icons Not Rendering

**Problem:** Black square or nothing shows

**Solutions:**
1. ✅ Ensure `viewBox` exists in SVG: `viewBox="0 0 24 24"`
2. ✅ Check if `fill` or `stroke` is set: Add `fill="currentColor"`
3. ✅ Verify size prop: `<Icon size={24} />` (not 0 or undefined)

### Colors Not Changing

**Problem:** `color` prop has no effect

**Solutions:**
1. ✅ SVG must use `fill="currentColor"` or `stroke="currentColor"`
2. ✅ Check SVGR config `replaceAttrValues` includes your color
3. ✅ Regenerate icons after config changes

### TypeScript Errors

**Problem:** `Cannot find module '@/components/icons'`

**Solutions:**
1. ✅ Run `npm run icons:generate` first
2. ✅ Check `tsconfig.json` has correct `paths` mapping
3. ✅ Restart TypeScript server in editor

### Build Fails

**Problem:** Metro bundler error

**Solutions:**
1. ✅ Ensure `react-native-svg` is installed
2. ✅ Clear Metro cache: `npx expo start -c`
3. ✅ Check all SVG files are valid XML

---

## 📚 Resources

- [SVGR Documentation](https://react-svgr.com/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [SVGOMG Optimizer](https://jakearchibald.github.io/svgomg/)
- [NativeWind vars() API](https://www.nativewind.dev/api/vars)
- [Figma Export Best Practices](https://help.figma.com/hc/en-us/articles/360040028114)

---

## 🎉 Summary

**Workflow:**
1. Export SVG from Figma → `assets/icons/`
2. Run `npm run icons:generate`
3. Import and use: `import { Icon } from '@/components/icons'`

**Benefits:**
- ✅ Type-safe icons with autocomplete
- ✅ Consistent API across all icons
- ✅ Full customization (size, color, className)
- ✅ Design system integration
- ✅ Zero manual work after setup

**Maintenance:**
- Update SVG → Regenerate → Done! ✨
