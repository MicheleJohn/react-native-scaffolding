import { ActivityIndicator, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button } from '@components/ui';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function PortalDetailPage() {
  const { id: _id, url } = useLocalSearchParams<{ id: string; url: string }>();
  const { t } = useTranslation();
  const router = useRouter();

  if (!url) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Button
          onPress={() => {
            router.back();
          }}>
          {t('common.back')}
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-3 border-b border-secondary-200">
        <Button
          onPress={() => {
            router.back();
          }}>
          ← {t('common.back')}
        </Button>
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: decodeURIComponent(url) }}
        startInLoadingState
        renderLoading={() => (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0284c7" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
