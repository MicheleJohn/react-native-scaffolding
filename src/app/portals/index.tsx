import { ScrollView, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import { Button, Card } from '@components/ui';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

type Portal = {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
};

const EXAMPLE_PORTALS: Portal[] = [
  {
    id: '1',
    name: 'Cultura Campania',
    description: 'Esplora la cultura della Campania',
    url: 'https://cultura.regione.campania.it',
    icon: '🏛️',
  },
  {
    id: '2',
    name: 'Sistema Informativo Culturale',
    description: 'Sistema informativo dei beni culturali',
    url: 'https://example.com',
    icon: '📚',
  },
  {
    id: '3',
    name: 'Mediateca dello Spettacolo',
    description: 'Archivio digitale dello spettacolo',
    url: 'https://example.com',
    icon: '🎭',
  },
  {
    id: '4',
    name: 'Itinerari Culturali',
    description: 'Scopri gli itinerari culturali',
    url: 'https://example.com',
    icon: '🧭',
  },
];

export default function PortalsPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleOpenPortal = (portal: Portal) => {
    router.push(`/portals/${portal.id}?url=${encodeURIComponent(portal.url)}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <ScrollView>
        {/* Header */}
        <View className="mb-6">
          <Button
            variant="ghost"
            onPress={() => {
              router.back();
            }}
            className="mb-4 self-start">
            ← {t('common.back')}
          </Button>
          <Text className="text-3xl font-bold text-secondary-900 mb-2">
            {t('portals.title')}
          </Text>
          <Text className="text-base text-secondary-600">
            {t('portals.explore')}
          </Text>
        </View>

        {/* Portals List */}
        <View className="gap-4">
          {EXAMPLE_PORTALS.map((portal) => (
            <Card key={portal.id}>
              <View className="flex-row items-center mb-3">
                <Text className="text-4xl mr-3">{portal.icon}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-secondary-900">
                    {portal.name}
                  </Text>
                  <Text className="text-sm text-secondary-600">
                    {portal.description}
                  </Text>
                </View>
              </View>
              <Button
                variant="primary"
                size="sm"
                onPress={() => {
                  handleOpenPortal(portal);
                }}>
                {t('portals.openPortal')}
              </Button>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
