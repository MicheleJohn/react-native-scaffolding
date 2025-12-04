import { ScrollView, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { Button, Card } from '@components/ui';
import { ThemeToggleIcon } from '@/components/shared';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-4">
          {/* Header with Theme Toggle */}
          <View className="mb-8 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-primary mb-2">
                {t('common.welcome')}
              </Text>
              <Text className="text-base text-secondary">
                React Native Scaffolding
              </Text>
            </View>
            <ThemeToggleIcon />
          </View>

          {/* Welcome Card */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-xl font-semibold text-primary mb-2">
              🚀 Ready to start!
            </Text>
            <Text className="text-secondary mb-4">
              This is your production-ready React Native scaffolding with Expo,
              TypeScript, TanStack Query, i18n, and more.
            </Text>
            <Button
              onPress={() => {
                console.log('Pressed!');
              }}>
              Get Started
            </Button>
          </Card>

          {/* Design System Showcase */}
          <Card variant="outlined" className="mb-6 border-primary">
            <Text className="text-lg font-semibold text-primary mb-2">
              🎨 Design System
            </Text>
            <Text className="text-secondary mb-3">
              Explore all UI components and color palette
            </Text>
            <Link href="/design-system" asChild>
              <Button variant="text" size="md">
                View Components & Colors
              </Button>
            </Link>
          </Card>

          {/* Features Cards */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-primary mb-4">
              ✨ Features
            </Text>

            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary mb-1">
                🎨 NativeWind (Tailwind)
              </Text>
              <Text className="text-secondary">
                Utility-first styling with Tailwind CSS classes
              </Text>
            </Card>

            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary mb-2">
                🔍 TanStack Query
              </Text>
              <Text className="text-secondary mb-3">
                Powerful data fetching and caching with React Query
              </Text>
              <Link href="/tanstack-demo" asChild>
                <Button variant="outlined" size="sm">
                  View Live Demo →
                </Button>
              </Link>
            </Card>

            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary mb-2">
                🌙 Dark Mode
              </Text>
              <Text className="text-secondary mb-3">
                Automatic theme switching with light, dark, and system modes
              </Text>
              <Link href="/theme-demo" asChild>
                <Button variant="outlined" size="sm">
                  View Theme Demo →
                </Button>
              </Link>
            </Card>

            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary mb-1">
                🌍 i18n Support
              </Text>
              <Text className="text-secondary">
                Multi-language support with i18next
              </Text>
            </Card>

            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary mb-1">
                🛡️ Sentry Integration
              </Text>
              <Text className="text-secondary">
                Error tracking and performance monitoring
              </Text>
              <Button
                variant="text"
                onPress={() => {
                  throw new Error('Sentry test error');
                }}>
                Send a sentry test error
              </Button>
            </Card>
          </View>

          {/* Navigation Examples */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-primary mb-4">
              🧪 Navigation Examples
            </Text>

            <Link href="/portals" asChild>
              <Button fullWidth>{t('navigation.portals')}</Button>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
