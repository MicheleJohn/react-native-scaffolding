# Dark Mode Guide

Complete guide to using dark mode in this React Native app with NativeWind.

## 📚 Overview

Dark mode is **automatically applied** throughout the entire app using NativeWind's `dark:` prefix. No dedicated demo page needed - just use the theme toggle!

### ✨ Features

- ✅ **Three theme modes**: Light, Dark, System (follows device settings)
- ✅ **Persistent preference**: Theme choice saved in AsyncStorage
- ✅ **Automatic switching**: System mode auto-updates with device
- ✅ **Type-safe context**: useTheme hook with TypeScript
- ✅ **CSS Variables**: Comprehensive color system that adapts
- ✅ **NativeWind integration**: Use Tailwind's `dark:` prefix everywhere
- ✅ **Theme toggle**: Icon in top-right corner of app

---

## Quick Start

### 1. Change Theme in App

Click the sun/moon icon in the top-right corner of the home page.

### 2. Use Dark Mode in Your Components

**Method 1: Tailwind `dark:` prefix (recommended)**

```tsx
<View className="bg-white dark:bg-neutral-900">
  <Text className="text-neutral-900 dark:text-neutral-50">
    Adapts to theme automatically
  </Text>
</View>
```

**Method 2: CSS Variables**

```tsx
<View className="bg-background">
  <Text className="text-primary-text">
    Uses CSS variables that auto-adapt
  </Text>
</View>
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

**Already integrated in `src/app/_layout.tsx`**

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
<View className="bg-background" />     // White → Dark
<View className="bg-surface" />        // Light gray → Darker
<View className="bg-card" />           // White → Dark
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

---

## Customizing Colors

### Edit `global.css`

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

### Use in Components

```tsx
<Text className="text-custom">
  Custom color that adapts!
</Text>
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

**Why:** CSS variables are more maintainable.

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

**Always test your UI in both modes using the theme toggle icon!**

---

## Troubleshooting

### Issue: Dark mode not activating

**Solution:** Check if `darkMode: 'class'` in `tailwind.config.js`

### Issue: Colors not changing in component

**Solution:** Ensure using Tailwind classes or CSS variables, not inline styles

### Issue: Theme not persisting

**Solution:** ThemeProvider automatically saves to AsyncStorage - check console for errors

---

**Happy theming! 🌙**
