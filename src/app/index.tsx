import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card } from '@components/ui';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-secondary-900 mb-2">
            {t('common.welcome')}
          </Text>
          <Text className="text-base text-secondary-600">
            React Native Scaffolding
          </Text>
        </View>

        {/* Welcome Card */}
        <Card className="mb-6">
          <Text className="text-xl font-semibold text-secondary-900 mb-2">
            🚀 Ready to start!
          </Text>
          <Text className="text-secondary-700 mb-4">
            This is your production-ready React Native scaffolding with Expo,
            TypeScript, TanStack Query, i18n, and more.
          </Text>
          <Button variant="primary" onPress={() => console.log('Pressed!')}>
            Get Started
          </Button>
        </Card>

        {/* Features Cards */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-secondary-900 mb-4">
            ✨ Features
          </Text>

          <Card className="mb-4">
            <Text className="text-lg font-semibold text-secondary-900 mb-1">
              🎨 NativeWind (Tailwind)
            </Text>
            <Text className="text-secondary-600">
              Utility-first styling with Tailwind CSS classes
            </Text>
          </Card>

          <Card className="mb-4">
            <Text className="text-lg font-semibold text-secondary-900 mb-1">
              🔍 TanStack Query
            </Text>
            <Text className="text-secondary-600">
              Powerful data fetching and caching
            </Text>
          </Card>

          <Card className="mb-4">
            <Text className="text-lg font-semibold text-secondary-900 mb-1">
              🌍 i18n Support
            </Text>
            <Text className="text-secondary-600">
              Multi-language support with i18next
            </Text>
          </Card>

          <Card className="mb-4">
            <Text className="text-lg font-semibold text-secondary-900 mb-1">
              🛡️ Sentry Integration
            </Text>
            <Text className="text-secondary-600">
              Error tracking and performance monitoring
            </Text>
          </Card>
        </View>

        {/* Navigation Examples */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-secondary-900 mb-4">
            🧪 Navigation Examples
          </Text>

          <Link href="/portals" asChild>
            <Button variant="outline" fullWidth>
              {t('navigation.portals')}
            </Button>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
