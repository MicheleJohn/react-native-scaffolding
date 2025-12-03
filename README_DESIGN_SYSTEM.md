# 🎨 Design System Documentation

## 📚 Overview

This scaffolding includes a complete, production-ready design system built with:

- **NativeWind v5** (Tailwind CSS v4) for utility-first styling
- **CVA (Class Variance Authority)** for type-safe component variants
- **Figma-based design tokens** for consistent colors, spacing, and typography

## 🚀 Philosophy

### Why CVA Instead of gluestack-ui?

**For a scaffolding project, we chose a minimal approach:**

✅ **CVA + NativeWind** provides:
- Zero component library dependencies
- Full control over component code
- Type-safe variants with TypeScript
- Minimal bundle size (~5KB vs 50KB+ per gluestack component)
- Easy customization without fighting library constraints

❌ **gluestack-ui v2** would introduce:
- Opinionated component architecture
- Copy-pasted code that becomes "yours to maintain"
- Manual update process for component improvements
- More code bloat in the scaffolding template

**Our approach**: Provide the **tools** (CVA + utilities) and **patterns** (examples), letting developers build exactly what they need.

---

## 🎨 Color System

All colors are defined in `global.css` using CSS custom properties (Tailwind v4 `@theme` syntax).

### Primary Colors

| Color | Value | Usage | Tailwind Class |
|-------|-------|-------|---------------|
| **Cyan** | `#009FE3` | Default primary actions | `bg-primary` |
| **Blue** | `#28529C` | Alternative primary | `bg-primary-blue` |
| **Teal** | `#0074A5` | Hover/Active states | `bg-primary-teal` |
| **Red** | `#CC1A1A` | Destructive actions | `bg-primary-red` |

### Neutral Colors

| Color | Value | Usage | Tailwind Class |
|-------|-------|-------|---------------|
| **White** | `#FFFFFF` | Backgrounds | `bg-white` |
| **Gray 50** | `#F2F4F7` | Light backgrounds | `bg-neutral-50` |
| **Gray 400** | `#98A2B3` | Borders, icons | `bg-neutral-400` / `border-border` |
| **Gray 700** | `#344054` | Secondary text | `text-secondary` |
| **Gray 900** | `#0F172A` | Primary text | `text-primary` |

### Secondary Colors

| Color | Value | Usage | Tailwind Class |
|-------|-------|-------|---------------|
| **Light Blue** | `#E6F4FA` | Info backgrounds | `bg-secondary-light` |
| **Green** | `#A6C48A` | Success states | `bg-secondary-green` / `text-success` |
| **Yellow** | `#F2C94C` | Warnings | `bg-secondary-yellow` / `text-warning` |

### Semantic Colors

The design system automatically maps semantic colors:

```tsx
<View className="bg-success" />    // Green
<View className="bg-error" />      // Red
<View className="bg-warning" />    // Yellow
<View className="bg-info" />       // Cyan
```

---

## 🧩 Components

### Button

**Type-safe variants with CVA:**

```tsx
import { Button } from '@/components/ui';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>  // default
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Custom styling
<Button className="mt-4 w-full">Custom</Button>
```

**Type safety:**
```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  // ... + all TouchableOpacityProps
}
```

---

### Card

**Container for grouped content:**

```tsx
import { Card } from '@/components/ui';

// Variants
<Card variant="default">       // No shadow, plain background
<Card variant="elevated">      // With shadow
<Card variant="outlined">      // With border

// Custom styling
<Card className="mb-4 p-6">
  <Text>Content</Text>
</Card>
```

---

### Chip

**Tags and filters:**

```tsx
import { Chip } from '@/components/ui';

// Variants
<Chip label="React" variant="default" />
<Chip label="TypeScript" variant="primary" />
<Chip label="Success" variant="success" />
<Chip label="Error" variant="error" />

// Selected state
<Chip label="Selected" selected />

// Removable
<Chip
  label="Removable"
  onRemove={() => console.log('removed')}
/>
```

---

### Input

**Form input with labels, errors, and icons:**

```tsx
import { Input } from '@/components/ui';

// Basic
<Input
  label="Email"
  placeholder="Enter email"
  value={value}
  onChangeText={setValue}
/>

// With helper text
<Input
  label="Password"
  secureTextEntry
  helperText="Must be at least 8 characters"
/>

// With error
<Input
  label="Username"
  value={username}
  error="Username is required"
/>

// With icons
<Input
  placeholder="Search..."
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
  onRightIconPress={() => setValue('')}
/>
```

---

### Tabs

**Tab navigation:**

```tsx
import { Tabs, type Tab } from '@/components/ui';

const tabs: Tab[] = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
];

// Pills variant (rounded background)
<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="pills"     // default
/>

// Underline variant
<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="underline"
/>
```

---

### NavigationBar

**Bottom navigation:**

```tsx
import { NavigationBar, type NavigationItem } from '@/components/ui';

const items: NavigationItem[] = [
  {
    id: 'home',
    icon: <HomeIcon />,
    onPress: () => navigate('home'),
    active: route === 'home',
  },
  // ... more items
];

// Light variant (white background)
<NavigationBar items={items} variant="light" />

// Dark variant (dark background)
<NavigationBar items={items} variant="dark" />
```

---

## 🛠️ Utilities

### `cn()` - Class Name Merger

**Combines Tailwind classes intelligently:**

```tsx
import { cn } from '@/utils/cn';

// Merges classes, removing conflicts
const className = cn(
  'px-4 py-2',                    // Base classes
  isActive && 'bg-primary',       // Conditional
  isDisabled && 'opacity-50',     // Conditional
  props.className                 // User overrides
);

// ✅ Correctly handles Tailwind conflicts
cn('p-4', 'p-2')  // → 'p-2' (last wins)
cn('text-sm', 'text-lg')  // → 'text-lg'
```

**Under the hood:**
- Uses `clsx` for conditional classes
- Uses `tailwind-merge` to deduplicate conflicting utilities

---

## 🎯 How to Create New Components

### 1. Define Variants with CVA

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const badgeVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center rounded-full px-2.5 py-0.5 font-medium',
  {
    variants: {
      variant: {
        default: 'bg-neutral-50 text-primary',
        success: 'bg-success/10 text-success border border-success',
        error: 'bg-error/10 text-error border border-error',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);
```

### 2. Create Component with Props

```tsx
export type BadgeProps = React.ComponentProps<typeof View> &
  VariantProps<typeof badgeVariants> & {
    label: string;
    className?: string;
  };

export const Badge: React.FC<BadgeProps> = ({
  variant,
  size,
  label,
  className,
  ...props
}) => {
  return (
    <View
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      <Text>{label}</Text>
    </View>
  );
};
```

### 3. Export with Types

```tsx
// src/components/ui/index.ts
export { Badge, type BadgeProps } from './Badge';
```

### 4. Use with Type Safety

```tsx
import { Badge } from '@/components/ui';

// ✅ TypeScript autocomplete for variants
<Badge variant="success" size="sm" label="New" />

// ❌ TypeScript error - invalid variant
<Badge variant="invalid" />  // Error!
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",  // CVA for variants
    "clsx": "^2.1.1",                      // Conditional classes
    "tailwind-merge": "^3.4.0",            // Tailwind deduplication
    "nativewind": "5.0.0-preview.2"        // Tailwind for RN
  }
}
```

**Total overhead: ~15KB gzipped** (vs 200KB+ for full component libraries)

---

## 🎨 Customization

### Extending Colors

Add to `global.css`:

```css
@theme {
  /* Your custom colors */
  --color-brand: #FF6B00;
  --color-accent: #9333EA;
}
```

Use in components:

```tsx
<View className="bg-brand text-accent" />
```

### Extending Variants

```tsx
const buttonVariants = cva('...', {
  variants: {
    variant: {
      // ... existing variants
      brand: 'bg-brand text-white',  // New variant
    },
  },
});
```

---

## 📖 Best Practices

### ✅ DO

- **Use CVA for component variants** - type-safe and maintainable
- **Use `cn()` for class merging** - handles Tailwind conflicts correctly
- **Follow design tokens** - use defined colors, spacing, typography
- **Export types** - enable autocomplete and type checking
- **Document variants** - add JSDoc comments to components

### ❌ DON'T

- **Don't use inline styles** - use Tailwind classes via `className`
- **Don't hardcode colors** - use design tokens (`bg-primary` not `bg-[#009FE3]`)
- **Don't create variants in component code** - use CVA
- **Don't skip TypeScript** - always type your props and variants

---

## 🚀 Examples

See `/src/app/design-system.tsx` for a complete showcase of all components.

**Run the demo:**

```bash
pnpm start
# Navigate to /design-system route
```

---

## 📚 Resources

- [CVA Documentation](https://cva.style/docs)
- [NativeWind v5 Docs](https://www.nativewind.dev/v5)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [clsx Documentation](https://github.com/lukeed/clsx)
- [tailwind-merge Documentation](https://github.com/dcastil/tailwind-merge)

---

## 🤝 Contributing

When adding new components:

1. ✅ Use CVA for variants
2. ✅ Export TypeScript types
3. ✅ Add JSDoc documentation
4. ✅ Update this README with examples
5. ✅ Add to showcase page (`/design-system`)

---

**Made with ❤️ for production-ready React Native projects**
