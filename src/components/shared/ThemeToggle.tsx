import { Pressable, Text, View } from 'react-native';

import { useTheme } from '@/providers';

type ThemeOption = 'light' | 'dark' | 'system';

const THEME_OPTIONS: { value: ThemeOption; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'system', label: 'System', icon: '⚙️' },
];

export function ThemeToggle() {
  const { themeMode, setThemeMode } = useTheme();

  return (
    <View className="flex-row gap-2 p-2 bg-surface rounded-lg">
      {THEME_OPTIONS.map((option) => {
        const isActive = themeMode === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => {
              setThemeMode(option.value);
            }}
            className={`
              flex-1 items-center justify-center py-3 px-4 rounded-md
              ${isActive ? 'bg-primary' : 'bg-transparent'}
            `}>
            <Text className="text-2xl mb-1">{option.icon}</Text>
            <Text
              className={`
                text-sm font-medium
                ${isActive ? 'text-white' : 'text-secondary-text'}
              `}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * Simple icon-only toggle button (for headers/nav)
 */
export function ThemeToggleIcon() {
  const { themeMode, setThemeMode, isDark } = useTheme();

  const handleToggle = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  return (
    <Pressable
      onPress={handleToggle}
      className="w-10 h-10 items-center justify-center rounded-full bg-surface active:opacity-70">
      <Text className="text-2xl">{themeMode === 'dark' ? '🌙' : '☀️'}</Text>
    </Pressable>
  );
}
