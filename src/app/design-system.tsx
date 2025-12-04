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
import { tokens } from '@/theme/tokens';

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
   */
  const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
    <View className="items-center mb-3">
      <VariableContextProvider value={{ '--color-palette': color }}>
        <View className="w-16 h-16 rounded-lg mb-2 border border-border bg-(--color-palette)" />
      </VariableContextProvider>
      <Text className="text-xs text-secondary-text text-center">{name}</Text>
      <Text className="text-xs text-tertiary-text font-mono">{color}</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-background">
      <ScrollView className="bg-background">
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Link href="/" asChild>
              <Button variant="text" size="sm" className="self-start -ml-2 mb-4">
                ← Back
              </Button>
            </Link>
            <Text className="text-3xl font-bold text-primary mb-2">
              🎨 Design System
            </Text>
            <Text className="text-base text-secondary-text">
              Complete UI component library and color palette
            </Text>
          </View>

          {/* Colors Section */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-primary-text mb-4">Colors</Text>

            {/* Primary Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary-text mb-3">
                Primary
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch color={tokens.colors.primary.cyan} name="Cyan" />
                <ColorSwatch color={tokens.colors.primary.blue} name="Blue" />
                <ColorSwatch color={tokens.colors.primary.teal} name="Teal" />
                <ColorSwatch color={tokens.colors.primary.red} name="Red" />
              </View>
            </Card>

            {/* Neutral Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary-text mb-3">
                Neutral
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch color={tokens.colors.neutral.white} name="White" />
                <ColorSwatch color={tokens.colors.neutral['50']} name="Gray 50" />
                <ColorSwatch color={tokens.colors.neutral['400']} name="Gray 400" />
                <ColorSwatch color={tokens.colors.neutral['700']} name="Gray 700" />
                <ColorSwatch color={tokens.colors.neutral['800']} name="Gray 800" />
                <ColorSwatch color={tokens.colors.neutral['900']} name="Gray 900" />
              </View>
            </Card>

            {/* Secondary Colors */}
            <Card variant="elevated" className="mb-4">
              <Text className="text-lg font-semibold text-primary-text mb-3">
                Secondary
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <ColorSwatch color={tokens.colors.secondary.lightBlue} name="Light Blue" />
                <ColorSwatch color={tokens.colors.secondary.green} name="Green" />
                <ColorSwatch color={tokens.colors.secondary.yellow} name="Yellow" />
                <ColorSwatch color={tokens.colors.secondary.darkNavy} name="Dark Navy" />
              </View>
            </Card>
          </View>

          {/* Components Section */}
          <Text className="text-2xl font-bold text-primary-text mb-4">
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
            <Text className="text-lg font-semibold text-primary-text mb-3">
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
            <Text className="text-lg font-semibold text-primary-text mb-3">
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
            <Text className="text-lg font-semibold text-primary-text mb-3">
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
            <Text className="text-lg font-semibold text-primary-text mb-3">
              Navigation Bars
            </Text>
            <View className="gap-4">
              <View>
                <Text className="text-sm text-secondary-text mb-2">
                  Light Variant
                </Text>
                <NavigationBar items={navigationItems} variant="light" />
              </View>
              <View>
                <Text className="text-sm text-secondary-text mb-2">
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
