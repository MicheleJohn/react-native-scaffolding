# Dark Mode Implementation Guide

Complete guide to using and customizing dark mode in this React Native app with NativeWind.

## 📚 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Theme System](#theme-system)
- [Using Dark Mode](#using-dark-mode)
- [Customizing Colors](#customizing-colors)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

### ✨ Features

- ✅ **Three theme modes**: Light, Dark, System (follows device settings)
- ✅ **Persistent preference**: Theme choice saved in AsyncStorage
- ✅ **Automatic switching**: System mode auto-updates with device
- ✅ **Type-safe context**: useTheme hook with TypeScript
- ✅ **CSS Variables**: Comprehensive color system that adapts
- ✅ **NativeWind integration**: Use Tailwind's `dark:` prefix
- ✅ **Live demo**: `/theme-demo` page showcases all features

### Architecture

```
┌──────────────────────┐
│   ThemeProvider      │
│  (Context + State)   │
└─────────┬────────────┘
          │
          ├───────────────────────────────┐
          │                               │
          v                               v
┌─────────────────┐       ┌─────────────────┐
│  useTheme Hook  │       │  CSS Variables  │
│  (Components)   │       │  (global.css)   │
└─────────────────┘       └─────────────────┘
          │                               │
          └───────────┬─────────────────┘
                      │
                      v
          ┌─────────────────────┐
          │   UI Components    │
          │  (Auto-adapting)   │
          └─────────────────────┘
```

---

## Quick Start

### 1. Live Demo

**Easiest way to explore dark mode:**

```bash
# Start app
pnpm start

# Navigate to: /theme-demo
# Or from home page: Dark Mode card → "View Theme Demo"
```

### 2. Use Theme Toggle

Add theme switcher to any page:

```tsx
import { ThemeToggle, ThemeToggleIcon } from '@/components/shared';

// Full toggle with 3 options (Light, Dark, System)
function SettingsPage() {
  return (
    <View>
      <Text>Choose Theme</Text>
      <ThemeToggle />
    </View>
  );
}

// Icon-only toggle (for headers/nav)
function Header() {
  return (
    <View className="flex-row items-center">
      <Text>My App</Text>
      <ThemeToggleIcon />
    </View>
  );
}
```

### 3. Use Dark Mode in Components

**Method 1: Tailwind `dark:` prefix (recommended)**

```tsx
function MyComponent() {
  return (
    <View className="bg-white dark:bg-neutral-800">
      <Text className="text-neutral-900 dark:text-neutral-50">
        Adapts to theme automatically
      </Text>
    </View>
  );
}
```

**Method 2: CSS Variables**

```tsx
function MyComponent() {
  return (
    <View className="bg-background">
      <Text className="text-primary-text">
        Uses CSS variables that auto-adapt
      </Text>
    </View>
  );
}
```

**Method 3: useTheme Hook**

```tsx
import { useTheme } from '@/providers';

function MyComponent() {
  const { isDark, colorScheme } = useTheme();

  return (
    <View>
      <Text>Current theme: {colorScheme}</Text>
      {isDark && <Text>Dark mode is active!</Text>}
    </View>
  );
}
```

---

## Theme System

### ThemeProvider

Located in `src/providers/ThemeProvider.tsx`

**Features:**
- Manages theme state (light, dark, system)
- Saves preference to AsyncStorage
- Listens to system color scheme changes
- Provides context via `useTheme` hook

**Already integrated in `src/app/_layout.tsx`:**

```tsx
function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>  {/* ✅ Already added */}
          <RootLayoutContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
```

### useTheme Hook

**API:**

```tsx
const {
  colorScheme,  // 'light' | 'dark' - effective color scheme
  themeMode,    // 'light' | 'dark' | 'system' - user preference
  setThemeMode, // (mode: ThemeMode) => Promise<void>
  isDark,       // boolean - true if dark mode active
} = useTheme();
```

**Example:**

```tsx
import { useTheme } from '@/providers';

function SettingsScreen() {
  const { themeMode, setThemeMode, isDark } = useTheme();

  return (
    <View>
      <Text>Current: {themeMode}</Text>
      <Text>Is Dark: {isDark ? 'Yes' : 'No'}</Text>

      <Button onPress={() => void setThemeMode('light')}>
        Light
      </Button>
      <Button onPress={() => void setThemeMode('dark')}>
        Dark
      </Button>
      <Button onPress={() => void setThemeMode('system')}>
        System
      </Button>
    </View>
  );
}
```

---

## Using Dark Mode

### Tailwind Dark Mode (Recommended)

**NativeWind supports Tailwind's `dark:` prefix:**

```tsx
// Background colors
<View className="bg-white dark:bg-neutral-900" />

// Text colors
<Text className="text-neutral-900 dark:text-neutral-50" />

// Border colors
<View className="border border-neutral-200 dark:border-neutral-700" />

// Multiple properties
<View className="
  bg-white dark:bg-neutral-900
  border dark:border-neutral-700
  shadow-sm dark:shadow-none
" />
```

### CSS Variables (Auto-Adapting)

**Defined in `global.css`, automatically switch:**

**Background Variables:**
```tsx
<View className="bg-background" />     // White → Dark blue
<View className="bg-surface" />        // Light gray → Darker blue
<View className="bg-card" />           // White → Dark blue
```

**Text Variables:**
```tsx
<Text className="text-primary-text" />    // Dark → Light
<Text className="text-secondary-text" />  // Medium → Medium-light
<Text className="text-tertiary-text" />   // Light → Medium
```

**Semantic Variables:**
```tsx
<Text className="text-success" />  // Green (adjusts for dark)
<Text className="text-error" />    // Red (adjusts for dark)
<Text className="text-warning" />  // Yellow (adjusts for dark)
<Text className="text-info" />     // Blue (adjusts for dark)
```

**Border Variables:**
```tsx
<View className="border-border" />       // Auto-adapts
<View className="border-border-light" /> // Auto-adapts
<View className="border-divider" />      // Auto-adapts
```

### Complete Variable List

See `global.css` for all variables:

**Backgrounds:**
- `--color-background`
- `--color-surface`
- `--color-card`
- `--color-overlay`

**Text:**
- `--color-primary-text`
- `--color-secondary-text`
- `--color-tertiary-text`
- `--color-inverse-text`
- `--color-link`
- `--color-disabled`

**Borders:**
- `--color-border`
- `--color-border-light`
- `--color-border-dark`
- `--color-border-focus`
- `--color-divider`

**Semantic:**
- `--color-success` / `--color-success-light`
- `--color-error` / `--color-error-light`
- `--color-warning` / `--color-warning-light`
- `--color-info` / `--color-info-light`

**Inputs:**
- `--color-input-bg`
- `--color-input-border`
- `--color-input-text`
- `--color-input-placeholder`
- `--color-input-disabled`

**Buttons:**
- `--color-button-primary-bg` / `--color-button-primary-text`
- `--color-button-secondary-bg` / `--color-button-secondary-text`
- `--color-button-ghost-text`

**Shadows:**
- `--color-shadow`
- `--color-shadow-lg`

---

## Customizing Colors

### 1. Edit `global.css`

**Add new variables or modify existing:**

```css
/* global.css */

@theme {
  /* Your custom light mode color */
  --color-custom: #ff6b6b;
}

@layer base {
  .dark {
    /* Your custom dark mode color */
    --color-custom: #fa5252;
  }
}
```

### 2. Use in Components

```tsx
<Text className="text-custom">
  Custom color that adapts!
</Text>
```

### 3. Semantic Color Pattern

**Best practice for new colors:**

```css
/* Light mode */
@theme {
  --color-brand: #6366f1;
  --color-brand-light: #e0e7ff;
  --color-brand-dark: #4338ca;
}

/* Dark mode overrides */
@layer base {
  .dark {
    --color-brand: #818cf8;
    --color-brand-light: #312e81;
    --color-brand-dark: #a5b4fc;
  }
}
```

**Usage:**

```tsx
<View className="bg-brand">
  <Text className="text-white">Brand color</Text>
</View>

<View className="bg-brand-light">
  <Text className="text-brand-dark">Light background</Text>
</View>
```

---

## Best Practices

### 1. Use CSS Variables for Semantic Colors

**✅ Good:**
```tsx
<View className="bg-background">
  <Text className="text-primary-text">Hello</Text>
</View>
```

**❌ Bad:**
```tsx
<View className="bg-white dark:bg-neutral-900">
  <Text className="text-black dark:text-white">Hello</Text>
</View>
```

**Why:** CSS variables are more maintainable and require less code.

### 2. Use `dark:` for Custom Overrides

**When you need specific dark mode adjustments:**

```tsx
// Custom shadow only in light mode
<View className="shadow-lg dark:shadow-none" />

// Different padding in dark mode
<View className="p-4 dark:p-6" />

// Hide element in dark mode
<View className="block dark:hidden" />
```

### 3. Test Both Themes

**Always test your UI in both modes:**

```tsx
// Add ThemeToggle to your dev/test screens
import { ThemeToggle } from '@/components/shared';

function TestScreen() {
  return (
    <View>
      <ThemeToggle />  {/* Quick theme switching */}
      {/* Your component */}
    </View>
  );
}
```

### 4. Avoid Hard-Coded Colors

**❌ Bad:**
```tsx
<Text style={{ color: '#000000' }}>Text</Text>
<View style={{ backgroundColor: '#ffffff' }} />
```

**✅ Good:**
```tsx
<Text className="text-primary-text">Text</Text>
<View className="bg-background" />
```

### 5. Use Opacity for Overlays

```tsx
// Semi-transparent overlay
<View className="bg-black/50 dark:bg-black/70">
  <Text className="text-white">Modal content</Text>
</View>
```

### 6. Consistent Icon Colors

```tsx
// Icons should adapt to text color
<HomeIcon color="currentColor" className="text-primary-text" />

// Or use CSS variable
<HomeIcon color="var(--color-primary)" />
```

---

## Troubleshooting

### Issue: Dark mode not activating

**Problem:** Theme changes but UI stays light

**Solution 1:** Check if `darkMode: 'class'` in `tailwind.config.js`

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',  // ✅ Required!
  // ...
};
```

**Solution 2:** Verify `ThemeProvider` wraps app

```tsx
// src/app/_layout.tsx
function RootLayout() {
  return (
    <ThemeProvider>  {/* Must wrap Slot */}
      <Slot />
    </ThemeProvider>
  );
}
```

**Solution 3:** For web, check if `.dark` class applied to root

```tsx
// Should be in _layout.tsx already
useEffect(() => {
  if (Platform.OS === 'web') {
    const root = document.documentElement;
    if (colorScheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}, [colorScheme]);
```

---

### Issue: Colors not changing in component

**Problem:** Component ignores dark mode

**Solution 1:** Ensure using Tailwind classes or CSS variables

```tsx
// ❌ Won't adapt
<View style={{ backgroundColor: 'white' }} />

// ✅ Will adapt
<View className="bg-white dark:bg-neutral-900" />
// or
<View className="bg-background" />
```

**Solution 2:** Check if custom color defined in both modes

```css
/* global.css */
@theme {
  --color-custom: #123456;  /* Light mode */
}

@layer base {
  .dark {
    --color-custom: #abcdef;  /* ✅ Dark mode override */
  }
}
```

---

### Issue: Theme not persisting

**Problem:** Theme resets on app restart

**Solution:** Check if AsyncStorage permission granted

```tsx
// ThemeProvider automatically saves to AsyncStorage
// Verify it's working:
import AsyncStorage from '@react-native-async-storage/async-storage';

const saved = await AsyncStorage.getItem('@app/theme-mode');
console.log('Saved theme:', saved);  // Should be 'light', 'dark', or 'system'
```

---

### Issue: Flashing on load (FOUC)

**Problem:** Light theme flashes before dark mode applies

**Solution:** Theme loads from AsyncStorage before render

```tsx
// ThemeProvider.tsx already has this
if (!isReady) {
  return null;  // Don't render until theme loaded
}
```

**For even faster loading, consider:**
1. Using `expo-splash-screen` to keep splash visible longer
2. Setting default theme in `global.css` to match most users

---

### Issue: System mode not updating

**Problem:** Theme doesn't change when device theme changes

**Solution:** Verify `useColorScheme` hook working

```tsx
// ThemeProvider.tsx already uses this
import { useColorScheme } from 'react-native';

const systemColorScheme = useColorScheme() ?? 'light';

// If themeMode is 'system', colorScheme follows device
const colorScheme = themeMode === 'system' 
  ? systemColorScheme 
  : themeMode;
```

---

## Resources

**Live Demo:**
- Navigate to `/theme-demo` in app
- See all colors, components, and code examples

**Source Files:**
- Provider: `src/providers/ThemeProvider.tsx`
- CSS Variables: `global.css`
- Tailwind Config: `tailwind.config.js`
- Components: `src/components/shared/ThemeToggle.tsx`
- Demo: `src/app/theme-demo.tsx`

**NativeWind Docs:**
- [Dark Mode Guide](https://www.nativewind.dev/dark-mode/toggling-dark-mode)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)

---

**Happy theming! 🌙**
