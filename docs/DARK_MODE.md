# 🌙 Dark Mode Guide

Complete guide to implementing and using dark mode with **NativeWind v5**.

## ✨ Features

- ✅ **Three Modes**: Light, Dark, System (follows device)
- ✅ **Persistent**: User preference saved in AsyncStorage  
- ✅ **CSS Variables**: Auto-switching theme colors
- ✅ **Type-Safe**: Runtime color access via tokens
- ✅ **Cross-Platform**: iOS, Android, Web

## 🎨 Architecture

### How It Works

1. **global.css** defines colors with CSS variables
   - `@theme` block = light mode defaults (RGB format)
   - `.dark` class = dark mode overrides

2. **tailwind.config.js** maps variables to utility classes
   - Semantic colors: `background: 'rgb(var(--color-background))'`
   - Brand colors: `primary: '#009fe3'` (static HEX)

3. **ThemeProvider** manages state and persistence

4. **_layout.tsx** applies `.dark` class to root element
   - Web: `document.documentElement.classList`
   - Mobile: `<View className="dark">` wrapper

### File Structure

```
src/
├── theme/tokens.ts          # Color constants (HEX values)
├── providers/ThemeProvider.tsx
├── app/_layout.tsx
global.css                   # CSS variables (RGB format)
tailwind.config.js           # Color mappings
```

## 📝 Usage

### Option 1: Semantic Colors (Recommended ✅)

Auto-adapting colors that change with theme:

```tsx
<View className="bg-background">
  <Text className="text-primary-text">Auto-adapts!</Text>
  <View className="border border-border" />
</View>
```

**Works on all platforms (iOS, Android, Web).**

### Option 2: Manual Conditional (Special Cases)

When you need colors not covered by semantic colors:

```tsx
import { useTheme } from '@/providers';

const { isDark } = useTheme();

<View className={isDark ? 'bg-slate-900' : 'bg-white'}>
  <Text className={isDark ? 'text-white' : 'text-black'}>Custom!</Text>
</View>
```

**Works on all platforms.**

### Option 3: Static Brand Colors (Don't Change)

Colors that stay the same regardless of theme:

```tsx
<Button className="bg-primary">Always cyan</Button>
<Text className="text-danger">Always red</Text>
```

### ⚠️ `dark:` Prefix - Web Only!

The `dark:` prefix works **only on web**, not on mobile in NativeWind v5:

```tsx
// ✅ Works on WEB ONLY
<View className="bg-white dark:bg-black">
  <Text className="text-black dark:text-white">Web only!</Text>
</View>

// ✅ Works on ALL platforms (use semantic colors)
<View className="bg-background">
  <Text className="text-primary-text">Cross-platform!</Text>
</View>

// ✅ Works on ALL platforms (manual conditional)
const { isDark } = useTheme();
<View className={isDark ? 'bg-black' : 'bg-white'}>
  <Text className={isDark ? 'text-white' : 'text-black'}>All platforms!</Text>
</View>
```

**Why?** NativeWind v5 uses CSS variables for mobile theming. The `dark:` prefix is a CSS selector that only works in actual CSS (web), not in React Native's StyleSheet system.

## 🔧 Theme Management

### Toggle Theme

```tsx
import { useTheme } from '@/providers';

const { isDark, themeMode, setThemeMode } = useTheme();

<Button onPress={() => void setThemeMode('dark')}>Dark</Button>
<Button onPress={() => void setThemeMode('light')}>Light</Button>
<Button onPress={() => void setThemeMode('system')}>System</Button>
```

### Theme Toggle Icon

```tsx
import { ThemeToggleIcon } from '@/components/shared';

<ThemeToggleIcon /> // Cycles: light → dark → system
```

### Runtime Access

```tsx
import { tokens } from '@/theme/tokens';

const brandColor = tokens.colors.primary.cyan; // '#009FE3'
<View style={{ borderColor: brandColor }} />
```

## ➕ Adding New Colors

### 1. global.css (RGB format)

```css
@theme {
  --color-my-color: 100 150 200; /* RGB: space-separated */
}

.dark {
  --color-my-color: 200 100 150;
}
```

### 2. tailwind.config.js

```javascript
colors: {
  'my-color': 'rgb(var(--color-my-color))', // Wrap with rgb()
}
```

### 3. Use

```tsx
<View className="bg-my-color" />
```

## ✅ Best Practices

**✅ DO:**
- Use semantic colors: `bg-background`, `text-primary-text`
- Use RGB format in CSS: `255 255 255` (not `#ffffff`)
- Wrap with `rgb()`: `rgb(var(--color-background))`
- Use manual conditionals for special cases
- Test on all platforms

**❌ DON'T:**
- ~~Use `dark:` prefix on mobile~~ (web only)
- Use HEX in CSS variables (breaks rgb())
- Hardcode colors in style props
- Mix semantic and hardcoded approaches

## 🔍 Color Types

### Semantic Colors (CSS Variables)

**Purpose:** Auto-adapting theme colors

**Format:**
- global.css: `--color-background: 255 255 255` (RGB)
- tailwind.config: `background: 'rgb(var(--color-background))'`
- Usage: `className="bg-background"`

### Brand Colors (Static)

**Purpose:** Fixed brand colors

**Format:**
- tokens.ts: `cyan: '#009fe3'` (HEX)
- tailwind.config: `primary: tokens.colors.primary.cyan`
- Usage: `className="bg-primary"` or `style={{ color: tokens.colors.primary.cyan }}`

## 🛠️ Troubleshooting

### Colors Not Changing?

1. Check using semantic colors: `bg-background` not `bg-white`
2. Verify RGB format in global.css
3. Check `rgb()` wrapper in tailwind.config.js
4. Debug: `console.log(isDark, colorScheme)`

### `dark:` Prefix Not Working on Mobile?

**Expected!** Use alternatives:
- Semantic colors: `bg-background`
- Manual conditional: `className={isDark ? 'bg-black' : 'bg-white'}`

## 📚 Reference

### useTheme Hook

```tsx
const {
  colorScheme,  // 'light' | 'dark'
  themeMode,    // 'light' | 'dark' | 'system'
  setThemeMode, // (mode) => Promise<void>
  isDark,       // boolean
} = useTheme();
```

### Semantic Colors

- Background: `background`, `surface`, `card`
- Text: `primary-text`, `secondary-text`, `tertiary-text`
- Borders: `border`, `border-light`, `divider`
- States: `success`, `error`, `warning`, `info`
- Inputs: `input-bg`, `input-border`, `input-text`
- Buttons: `button-primary-bg`, `button-primary-text`

### Static Brand Colors

- Primary: `primary`, `primary-dark`, `mid-blue`, `danger`
- Neutral: `neutral-50` through `neutral-900`
- Secondary: `secondary-light-blue`, `secondary-green`

---

**✨ Happy theming!**
