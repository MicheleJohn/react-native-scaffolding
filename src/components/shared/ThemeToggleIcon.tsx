import React from 'react';
import { Pressable, Text } from 'react-native';

import { useTheme } from '@/providers/ThemeProvider';

/**
 * ThemeToggleIcon Component
 *
 * Displays a sun/moon icon that toggles between light, dark, and system themes.
 * Cycles: light → dark → system → light...
 */
export function ThemeToggleIcon() {
  const { themeMode, setThemeMode, isDark } = useTheme();

  const getNextTheme = (): 'light' | 'dark' | 'system' => {
    switch (themeMode) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
      case 'system':
        return 'light';
    }
  };

  const handlePress = () => {
    const next = getNextTheme();
    void setThemeMode(next);
  };

  // Icon based on current effective theme
  const icon = isDark ? '🌙' : '☀️';

  // Show indicator for system mode
  const label = themeMode === 'system' ? `${icon} Auto` : icon;

  return (
    <Pressable
      onPress={handlePress}
      className="p-2 rounded-lg bg-surface"
      accessibilityLabel="Toggle theme"
      accessibilityRole="button">
      <Text className="text-2xl">{label}</Text>
    </Pressable>
  );
}
