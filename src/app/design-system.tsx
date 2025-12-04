import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { VariableContextProvider } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Button,
  Card,
  Chip,
  Input,
  NavigationBar,
  type NavigationItem,
  type Tab,
  Tabs,
} from '@/components/ui';
import { ButtonShowcase } from '@/components/ui/examples/ButtonShowcase';
import { CardShowcase } from '@/components/ui/examples/CardShowcase';

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
      onPress: () => {
        setActiveNavItem('home');
      },
      active: activeNavItem === 'home',
    },
    {
      id: 'search',
      icon: <Text className="text-2xl">🔍</Text>,
      onPress: () => {
        setActiveNavItem('search');
      },
      active: activeNavItem === 'search',
    },
    {
      id: 'map',
      icon: <Text className="text-2xl">🗺️</Text>,
      onPress: () => {
        setActiveNavItem('map');
      },
      active: activeNavItem === 'map',
    },
    {
      id: 'calendar',
      icon: <Text className="text-2xl">📅</Text>,
      onPress: () => {
        setActiveNavItem('calendar');
      },
      active: activeNavItem === 'calendar',
    },
  ];

  /**
   * ColorSwatch Component
   *
   * ⚠️ IMPORTANT: Uses ONLY className for styling to avoid React Native
   * style precedence issues. When mixing `style` and `className` props,
   * inline styles always override className properties.
   *
   * Using Tailwind arbitrary values: bg-[#HEXCODE]
   */
  const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
    <View className="items-center mb-3">
      <VariableContextProvider value={{ '--color-palette': color }}>
        <View
          className={`w-16 h-16 rounded-lg mb-2 border border-border dark:border-neutral-700 bg-(--color-palette)`}
        />
      </VariableContextProvider>
      <Text className="text-xs text-secondary-text dark:text-neutral-400 text-center">{name}</Text>
      <Text className="text-xs text-tertiary-text dark:text-neutral-500 font-mono">{color}</Text>
    </View>
  );

  // Design system colors (from global.css CSS variables)
  const designColors = {
    primary: {
      cyan: '#009FE3',
      blue: '#28529C',
      teal: '#0074A5',
      red: '#CC1A1A',
    },
    neutral: {
      white: '#FFFFFF',
      gray50: '#F2F4F7',
      gray400: '#98A2B3',
      gray700: '#344054',
      gray800: '#1D2939',
      gray900: '#0F172A',
    },
    secondary: {
      lightBlue: '#E6F4FA',
      green: '#A6C48A',
      yellow: '#F2C94C',
      darkNavy: '#0F172A',
    },
  };

  return (
    <SafeAreaView className="bg-background dark:bg-neutral-900">
      <ScrollView className="bg-background dark:bg-neutral-900">
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Link href="/" asChild>
              <Button
                variant="text"
                size="sm"
                className="self-start -ml-2 mb-4">
                ← Back
              </Button>
            </Link>
            <Text className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
              🎨 Design System
            </Text>
            <Text className="text-base text-secondary-text dark:text-neutral-400">
              Complete UI component library and color palette
            </Text>
          </View>

          {/* Colors Section */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-primary dark:text-primary-dark mb-4">Colors</Text>

            {/* Primary Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary dark:text-primary-dark mb-3">
                Primary
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch color={designColors.primary.cyan} name="Cyan" />
                <ColorSwatch color={designColors.primary.blue} name="Blue" />
                <ColorSwatch color={designColors.primary.teal} name="Teal" />
                <ColorSwatch color={designColors.primary.red} name="Red" />
              </View>
            </Card>

            {/* Neutral Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary dark:text-primary-dark mb-3">
                Neutral
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch color={designColors.neutral.white} name="White" />
                <ColorSwatch color={designColors.neutral.gray50} name="Gray 50" />
                <ColorSwatch color={designColors.neutral.gray400} name="Gray 400" />
                <ColorSwatch color={designColors.neutral.gray700} name="Gray 700" />
                <ColorSwatch color={designColors.neutral.gray800} name="Gray 800" />
                <ColorSwatch color={designColors.neutral.gray900} name="Gray 900" />
              </View>
            </Card>

            {/* Secondary Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary dark:text-primary-dark mb-3">
                Secondary
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch
                  color={designColors.secondary.lightBlue}
                  name="Light Blue"
                />
                <ColorSwatch color={designColors.secondary.green} name="Green" />
                <ColorSwatch color={designColors.secondary.yellow} name="Yellow" />
                <ColorSwatch
                  color={designColors.secondary.darkNavy}
                  name="Dark Navy"
                />
              </View>
            </Card>
          </View>

          {/* Components Section */}
          <Text className="text-2xl font-bold text-primary dark:text-primary-dark mb-4">
            Components
          </Text>

          {/* Buttons */}
          <Card variant="elevated" className="mb-6">
            <ButtonShowcase />
          </Card>

          {/* Cards */}
          <Card variant="elevated" className="mb-6">
            <CardShowcase />
          </Card>

          {/* Tabs */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-lg font-semibold text-primary dark:text-primary-dark mb-3">
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
            <Text className="text-lg font-semibold text-primary dark:text-primary-dark mb-3">
              Chips
            </Text>
            <View className="flex-row flex-wrap gap-2">
              <Chip label="Pizza" variant="primary" selected />
              <Chip label="Grafica" variant="default" />
              <Chip
                label="Arte"
                variant="default"
                onRemove={() => {
                  /* empty */
                }}
              />
              <Chip label="Success" variant="success" />
              <Chip label="Error" variant="error" />
            </View>
          </Card>

          {/* Input */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-lg font-semibold text-primary dark:text-primary-dark mb-3">
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
            <Text className="text-lg font-semibold text-primary dark:text-primary-dark mb-3">
              Navigation Bars
            </Text>
            <View className="gap-4">
              <View>
                <Text className="text-sm text-secondary-text dark:text-neutral-400 mb-2">
                  Light Variant
                </Text>
                <NavigationBar items={navigationItems} variant="light" />
              </View>
              <View>
                <Text className="text-sm text-secondary-text dark:text-neutral-400 mb-2">
                  Dark Variant
                </Text>
                <NavigationBar items={navigationItems} variant="dark" />
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
