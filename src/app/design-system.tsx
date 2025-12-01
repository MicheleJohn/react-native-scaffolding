import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import {
  Button,
  Card,
  Chip,
  Input,
  NavigationBar,
  Tabs,
  type NavigationItem,
  type Tab,
} from '@/components/ui';
import { colors } from '@/theme/colors';

/**
 * Design System Showcase Page
 * Displays all available components and colors from the design system
 */
export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('italiana');
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [inputValue, setInputValue] = useState('');

  const languageTabs: Tab[] = [
    { id: 'italiana', label: 'Italiana' },
    { id: 'inglese', label: 'Inglese' },
  ];

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      icon: <Text className="text-2xl">🏠</Text>,
      onPress: () => setActiveNavItem('home'),
      active: activeNavItem === 'home',
    },
    {
      id: 'search',
      icon: <Text className="text-2xl">🔍</Text>,
      onPress: () => setActiveNavItem('search'),
      active: activeNavItem === 'search',
    },
    {
      id: 'map',
      icon: <Text className="text-2xl">🗺️</Text>,
      onPress: () => setActiveNavItem('map'),
      active: activeNavItem === 'map',
    },
    {
      id: 'calendar',
      icon: <Text className="text-2xl">📅</Text>,
      onPress: () => setActiveNavItem('calendar'),
      active: activeNavItem === 'calendar',
    },
  ];

  const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
    <View className="items-center mb-3">
      <View
        style={{ backgroundColor: color }}
        className="w-16 h-16 rounded-lg mb-2 border border-border"
      />
      <Text className="text-xs text-text-secondary text-center">{name}</Text>
      <Text className="text-xs text-text-tertiary font-mono">{color}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Link href="/" asChild>
              <Button variant="ghost" size="sm" className="self-start -ml-2 mb-4">
                ← Back
              </Button>
            </Link>
            <Text className="text-3xl font-bold text-text-primary mb-2">
              🎨 Design System
            </Text>
            <Text className="text-base text-text-secondary">
              Complete UI component library and color palette
            </Text>
          </View>

          {/* Colors Section */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-text-primary mb-4">
              Colors
            </Text>

            {/* Primary Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-text-primary mb-3">
                Primary
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch color={colors.primary.cyan} name="Cyan" />
                <ColorSwatch color={colors.primary.blue} name="Blue" />
                <ColorSwatch color={colors.primary.teal} name="Teal" />
                <ColorSwatch color={colors.primary.red} name="Red" />
              </View>
            </Card>

            {/* Neutral Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-text-primary mb-3">
                Neutral
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch color={colors.neutral.white} name="White" />
                <ColorSwatch color={colors.neutral.gray50} name="Gray 50" />
                <ColorSwatch color={colors.neutral.gray400} name="Gray 400" />
                <ColorSwatch color={colors.neutral.gray700} name="Gray 700" />
                <ColorSwatch color={colors.neutral.gray800} name="Gray 800" />
                <ColorSwatch color={colors.neutral.gray900} name="Gray 900" />
              </View>
            </Card>

            {/* Secondary Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-text-primary mb-3">
                Secondary
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch color={colors.secondary.lightBlue} name="Light Blue" />
                <ColorSwatch color={colors.secondary.green} name="Green" />
                <ColorSwatch color={colors.secondary.yellow} name="Yellow" />
                <ColorSwatch color={colors.secondary.darkNavy} name="Dark Navy" />
              </View>
            </Card>
          </View>

          {/* Components Section */}
          <Text className="text-2xl font-bold text-text-primary mb-4">
            Components
          </Text>

          {/* Buttons */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-lg font-semibold text-text-primary mb-3">
              Buttons
            </Text>
            <View className="gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <View className="flex-row gap-2">
                <Button variant="primary" size="sm" className="flex-1">
                  Small
                </Button>
                <Button variant="primary" size="md" className="flex-1">
                  Medium
                </Button>
                <Button variant="primary" size="lg" className="flex-1">
                  Large
                </Button>
              </View>
              <Button variant="primary" loading>
                Loading
              </Button>
            </View>
          </Card>

          {/* Tabs */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-lg font-semibold text-text-primary mb-3">
              Tabs (Pills)
            </Text>
            <Tabs
              tabs={languageTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="pills"
            />
          </Card>

          {/* Chips */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-lg font-semibold text-text-primary mb-3">
              Chips
            </Text>
            <View className="flex-row flex-wrap gap-2">
              <Chip label="Pizza" variant="primary" selected />
              <Chip label="Grafica" variant="default" />
              <Chip label="Arte" variant="default" onRemove={() => {}} />
              <Chip label="Success" variant="success" />
              <Chip label="Error" variant="error" />
            </View>
          </Card>

          {/* Input */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-lg font-semibold text-text-primary mb-3">
              Input Fields
            </Text>
            <View className="gap-3">
              <Input
                label="Email"
                placeholder="Enter your email"
                value={inputValue}
                onChangeText={setInputValue}
                helperText="We'll never share your email"
              />
              <Input
                label="Password"
                placeholder="Enter password"
                secureTextEntry
                error="Password must be at least 8 characters"
              />
              <Input placeholder="Search..." leftIcon={<Text>🔍</Text>} />
            </View>
          </Card>

          {/* Navigation Bars */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-lg font-semibold text-text-primary mb-3">
              Navigation Bars
            </Text>
            <View className="gap-4">
              <View>
                <Text className="text-sm text-text-secondary mb-2">Light Variant</Text>
                <NavigationBar items={navigationItems} variant="light" />
              </View>
              <View>
                <Text className="text-sm text-text-secondary mb-2">Dark Variant</Text>
                <NavigationBar items={navigationItems} variant="dark" />
              </View>
            </View>
          </Card>

          {/* Cards */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-text-primary mb-3">
              Card Variants
            </Text>
            <Card variant="default" className="mb-3">
              <Text className="text-text-primary">Default Card</Text>
            </Card>
            <Card variant="elevated" className="mb-3">
              <Text className="text-text-primary">Elevated Card</Text>
            </Card>
            <Card variant="outlined">
              <Text className="text-text-primary">Outlined Card</Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
