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
   - `@theme` block = light mode defaults
   - `.dark` class = dark mode overrides

2. **tailwind.config.js** maps variables to utility classes
   - `background: 'rgb(var(--color-background))'`

3. **ThemeProvider** manages state and persistence

4. **_layout.tsx** applies `.dark` class to root element
   - Web: `document.documentElement.classList`
   - Mobile: `<View className="dark">`

### File Structure

```
src/
├── theme/tokens.ts          # Color constants
├── providers/ThemeProvider.tsx
├── app/_layout.tsx
global.css
tailwind.config.js
```

## 📝 Usage

### Semantic Colors (Recommended)

Auto-adapting colors:

```tsx
<View className="bg-background">
  <Text className="text-primary-text">Auto-adapts!</Text>
</View>
```

### Manual Override (When Needed)

```tsx
<View className="bg-white dark:bg-slate-900">
  <Text className="text-black dark:text-white">Custom!</Text>
</View>
```

### Toggle Theme

```tsx
import { useTheme } from '@/providers';

const { isDark, setThemeMode } = useTheme();

<Button onPress={() => void setThemeMode('dark')}>
  Dark Mode
</Button>
```

### Runtime Access

```tsx
import { tokens } from '@/theme/tokens';

const color = tokens.colors.primary.cyan; // '#009FE3'
```

## ➕ Adding New Colors

### 1. global.css

```css
@theme {
  --color-my-color: 100 150 200; /* RGB format */
}

.dark {
  --color-my-color: 200 100 150;
}
```

### 2. tailwind.config.js

```javascript
colors: {
  'my-color': 'rgb(var(--color-my-color))',
}
```

### 3. Use

```tsx
<View className="bg-my-color" />
```

## ✅ Best Practices

**✅ DO:**
- Use RGB format: `255 255 255` (not `#ffffff`)
- Wrap with `rgb()`: `rgb(var(--color-background))`
- Use semantic names: `bg-background`, `text-primary-text`
- Test both light and dark modes

**❌ DON'T:**
- Use HEX in CSS variables
- Hardcode colors: `style={{ backgroundColor: '#fff' }}`
- Mix semantic and manual approaches

## 🔧 Troubleshooting

### Colors not changing?

1. Check `.dark` class is applied (debug with `console.log(isDark)`)
2. Verify RGB format in global.css
3. Ensure `rgb()` wrapper in tailwind.config.js

### Warning about className changes?

Add `key` prop:

```tsx
<View key={colorScheme} className={isDark ? 'dark flex-1' : 'flex-1'}>
```

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

---

**✨ Full implementation details in the code!**
