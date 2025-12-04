import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Input } from '@/components/ui';
import { ThemeToggle } from '@/components/shared';
import { useTheme } from '@/providers';

export default function ThemeDemoPage() {
  const router = useRouter();
  const { colorScheme, themeMode } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Button variant="text" size="sm" onPress={() => router.back()}>
            ← Back
          </Button>
          <Text className="text-3xl font-bold text-primary-text mt-4">
            🎨 Dark Mode Demo
          </Text>
          <Text className="text-secondary-text mt-2">
            Current: {colorScheme} (mode: {themeMode})
          </Text>
        </View>

        {/* Theme Toggle */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-primary-text mb-3">
            Theme Settings
          </Text>
          <ThemeToggle />
        </View>

        {/* Color Showcase */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-primary-text mb-3">
            Color Palette
          </Text>

          {/* Background Colors */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-secondary-text mb-2">
              Backgrounds
            </Text>
            <View className="flex-row gap-2 flex-wrap">
              <View className="bg-background border-2 border-border p-4 rounded-lg">
                <Text className="text-primary-text text-xs">Background</Text>
              </View>
              <View className="bg-surface border-2 border-border p-4 rounded-lg">
                <Text className="text-primary-text text-xs">Surface</Text>
              </View>
              <View className="bg-card border-2 border-border p-4 rounded-lg">
                <Text className="text-primary-text text-xs">Card</Text>
              </View>
            </View>
          </View>

          {/* Text Colors */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-secondary-text mb-2">
              Text Colors
            </Text>
            <View className="bg-card p-4 rounded-lg border border-border">
              <Text className="text-primary-text mb-2">Primary Text</Text>
              <Text className="text-secondary-text mb-2">Secondary Text</Text>
              <Text className="text-tertiary-text mb-2">Tertiary Text</Text>
              <Text className="text-link">Link Text</Text>
            </View>
          </View>

          {/* Semantic Colors */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-secondary-text mb-2">
              Semantic Colors
            </Text>
            <View className="gap-2">
              <View className="bg-success/10 border border-success p-3 rounded-lg">
                <Text className="text-success font-medium">✅ Success</Text>
              </View>
              <View className="bg-error/10 border border-error p-3 rounded-lg">
                <Text className="text-error font-medium">❌ Error</Text>
              </View>
              <View className="bg-warning/10 border border-warning p-3 rounded-lg">
                <Text className="text-warning font-medium">⚠️ Warning</Text>
              </View>
              <View className="bg-info/10 border border-info p-3 rounded-lg">
                <Text className="text-info font-medium">ℹ️ Info</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Components Showcase */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-primary-text mb-3">
            Components
          </Text>

          {/* Buttons */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-secondary-text mb-2">
              Buttons
            </Text>
            <View className="gap-2">
              <Button variant="filled" size="md">
                Primary Button
              </Button>
              <Button variant="outline" size="md">
                Outline Button
              </Button>
              <Button variant="text" size="md">
                Text Button
              </Button>
              <Button variant="filled" size="md" disabled>
                Disabled Button
              </Button>
            </View>
          </View>

          {/* Inputs */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-secondary-text mb-2">
              Inputs
            </Text>
            <View className="gap-4">
              <Input label="Default Input" placeholder="Enter text..." />
              <Input
                label="With Value"
                placeholder="Enter text..."
                value="Sample text"
              />
              <Input
                label="With Error"
                placeholder="Enter text..."
                error="This field is required"
              />
              <Input
                label="Disabled"
                placeholder="Enter text..."
                editable={false}
              />
            </View>
          </View>

          {/* Cards */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-secondary-text mb-2">
              Cards
            </Text>
            <View className="bg-card border border-border rounded-lg p-4">
              <Text className="text-lg font-semibold text-primary-text mb-2">
                Card Title
              </Text>
              <Text className="text-secondary-text mb-3">
                This is a card component that adapts to the current theme. Notice
                how the background and text colors change.
              </Text>
              <View className="flex-row gap-2">
                <Button variant="filled" size="sm">
                  Action
                </Button>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </View>

        {/* Usage Instructions */}
        <View className="bg-info/10 border border-info rounded-lg p-4 mb-6">
          <Text className="text-info font-semibold mb-2">
            💡 How to Use Dark Mode
          </Text>
          <Text className="text-primary-text text-sm leading-6">
            1. Use Tailwind's{' '}
            <Text className="font-mono bg-surface px-1">dark:</Text> prefix for
            dark mode styles
            {`\n`}2. Use CSS variables from{' '}
            <Text className="font-mono bg-surface px-1">global.css</Text>
            {`\n`}3. Colors automatically adapt to theme changes
            {`\n`}4. Theme preference is saved in AsyncStorage
          </Text>
        </View>

        {/* Code Examples */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-primary-text mb-3">
            Code Examples
          </Text>

          <View className="bg-surface border border-border rounded-lg p-4 mb-4">
            <Text className="text-xs font-medium text-tertiary-text mb-2">
              Using Tailwind Classes
            </Text>
            <Text className="font-mono text-xs text-primary-text">
              {`<View className="bg-background dark:bg-surface">\n  <Text className="text-primary-text">\n    Adapts to theme\n  </Text>\n</View>`}
            </Text>
          </View>

          <View className="bg-surface border border-border rounded-lg p-4 mb-4">
            <Text className="text-xs font-medium text-tertiary-text mb-2">
              Using useTheme Hook
            </Text>
            <Text className="font-mono text-xs text-primary-text">
              {`const { isDark, colorScheme, setThemeMode } = useTheme();\n\nsetThemeMode('dark'); // or 'light' or 'system'`}
            </Text>
          </View>

          <View className="bg-surface border border-border rounded-lg p-4">
            <Text className="text-xs font-medium text-tertiary-text mb-2">
              Using CSS Variables
            </Text>
            <Text className="font-mono text-xs text-primary-text">
              {`<View style={{ \n  backgroundColor: 'var(--color-background)'\n}}>\n  {/* Auto-adapts to theme */}\n</View>`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
