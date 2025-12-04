import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { secureStorage } from '@/lib/secure-storage';

type ColorScheme = 'light' | 'dark';
type ThemeMode = ColorScheme | 'system';

type ThemeContextType = {
  colorScheme: ColorScheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme-mode';

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * ThemeProvider
 *
 * Manages theme mode (light/dark/system) and persists user preference.
 * Works with NativeWind v5 CSS variables defined in global.css.
 *
 * The .dark class is applied to the root element in _layout.tsx:
 * - Web: document.documentElement.classList
 * - Mobile: View wrapper with className="dark"
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // React Native's system color scheme
  const systemColorScheme = useRNColorScheme() ?? 'light';

  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isReady, setIsReady] = useState(false);

  // Determine effective color scheme
  const colorScheme: ColorScheme = themeMode === 'system' ? systemColorScheme : themeMode;

  const isDark = colorScheme === 'dark';

  // Load saved theme preference on mount
  useEffect(() => {
    async function loadTheme() {
      try {
        const saved = await secureStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setThemeModeState(saved);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsReady(true);
      }
    }
    void loadTheme();
  }, []);

  // Save theme preference when it changes
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await secureStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  // Don't render children until theme is loaded
  if (!isReady) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        themeMode,
        setThemeMode,
        isDark,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
