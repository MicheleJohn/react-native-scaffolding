import React from 'react';
import { Text, View } from 'react-native';

import { Card, EventCard, ExperienceCard, HeritageCard } from '../';

/**
 * Comprehensive showcase of all Card variants
 * Demonstrates the full API surface of Card components
 */
export const CardShowcase = () => {
  const handlePress = (cardName: string) => {
    console.log(`${cardName} pressed!`);
  };

  return (
    <View className="bg-background">
      <Text className="text-3xl font-bold mb-2 text-text">
        Card Components Showcase
      </Text>
      <Text className="text-base text-text-secondary mb-8">
        Explore all card variants and configurations
      </Text>

      {/* Base Card Variants */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4 text-text">
          Base Card Variants
        </Text>
        <View className="gap-4">
          <Card variant="default">
            <Text className="text-base text-text font-medium">
              Default Card
            </Text>
            <Text className="text-sm text-text-secondary mt-2">
              Basic card with default background
            </Text>
          </Card>

          <Card variant="elevated">
            <Text className="text-base text-text font-medium">
              Elevated Card
            </Text>
            <Text className="text-sm text-text-secondary mt-2">
              Card with shadow elevation
            </Text>
          </Card>

          <Card variant="outlined">
            <Text className="text-base text-text font-medium">
              Outlined Card
            </Text>
            <Text className="text-sm text-text-secondary mt-2">
              Card with border
            </Text>
          </Card>

          <Card variant="filled">
            <Text className="text-base text-text font-medium">Filled Card</Text>
            <Text className="text-sm text-text-secondary mt-2">
              Card with filled background
            </Text>
          </Card>
        </View>
      </View>

      {/* Size Variants */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4 text-text">
          Size Variants
        </Text>
        <View className="gap-4">
          <Card variant="elevated" size="sm">
            <Text className="text-sm text-text font-medium">Small Card</Text>
          </Card>

          <Card variant="elevated" size="md">
            <Text className="text-base text-text font-medium">
              Medium Card (Default)
            </Text>
          </Card>

          <Card variant="elevated" size="lg">
            <Text className="text-lg text-text font-medium">Large Card</Text>
          </Card>
        </View>
      </View>

      {/* Interactive Cards */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4 text-text">
          Interactive Cards
        </Text>
        <View className="gap-4">
          <Card variant="outlined" interactive>
            <Text className="text-base text-text font-medium">
              Interactive Card
            </Text>
            <Text className="text-sm text-text-secondary mt-2">
              Tap to see opacity feedback
            </Text>
          </Card>
        </View>
      </View>

      {/* Event Cards */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4 text-text">
          Event Cards
        </Text>
        <Text className="text-sm text-text-secondary mb-4">
          Vertical cards for cultural events with badges, dates, and locations
        </Text>
        <View className="gap-6">
          <EventCard
            title="Scarpetta 100"
            subtitle="Mostra dedicata all'attore Eduardo Scarpetta"
            location="Napoli, Biblioteca Nazionale"
            dateRange="30/06/2025 - 01/12/2025"
            badge="Mostre virtuali"
            price="Gratuito"
            image={{
              uri: 'https://images.unsplash.com/photo-1578926078876-58cceb8cfc1f?w=800',
            }}
            onPress={() => {
              handlePress('Scarpetta 100');
            }}
          />

          <EventCard
            title="Abitatori del tempo"
            subtitle="L'impegno civile del Novecento"
            location="Salerno, Camera di Commercio"
            dateRange="25/09/2025 al 02/12/2025"
            badge="Eventi"
            price="€5"
            badgeVariant="price"
            image={{
              uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
            }}
            onPress={() => {
              handlePress('Abitatori del tempo');
            }}
          />

          <EventCard
            title="Riapre al pubblico"
            subtitle="La stanza delle Meraviglie"
            location="Napoli, Teatro Trianon Viviani"
            dateRange="18/03/2025 al 31/01/2026"
            badge="Ecosistema"
            price="Gratuito"
            image={{
              uri: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=800',
            }}
            onPress={() => {
              handlePress('Riapre al pubblico');
            }}
          />
        </View>
      </View>

      {/* Experience Cards */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4 text-text">
          Experience Cards
        </Text>
        <Text className="text-sm text-text-secondary mb-4">
          Horizontal cards for interactive 3D experiences and virtual tours
        </Text>
        <View className="gap-6">
          <ExperienceCard
            title="Duomo di Napoli"
            subtitle="Le sale della Reggia in 3D navigabile"
            badgeType="virtual-tour"
            ctaText="Esplora in 3D"
            image={{
              uri: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800',
            }}
            onPress={() => {
              handlePress('Duomo di Napoli');
            }}
          />

          <ExperienceCard
            title="Altorilievo"
            subtitle="Rivivi la storia attraverso AR"
            badgeType="ar"
            ctaText="Esplora in 3D"
            image={{
              uri: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800',
            }}
            onPress={() => {
              handlePress('Altorilievo');
            }}
          />

          <ExperienceCard
            title="Abitazione arcaica"
            subtitle="Installazioni artistiche interattive"
            badgeType="3d-scenes"
            ctaText="Esplora in 3D"
            image={{
              uri: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
            }}
            onPress={() => {
              handlePress('Abitazione arcaica');
            }}
          />
        </View>
      </View>

      {/* Heritage Cards */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4 text-text">
          Heritage Cards
        </Text>
        <Text className="text-sm text-text-secondary mb-4">
          Detail cards for cultural heritage items with hero images
        </Text>
        <View className="gap-6">
          <HeritageCard
            title="Presepe napoletano"
            subtitle="Artigianato e tradizione"
            description="L'arte del presepe è una tradizione che risale al Settecento. Maestri artigiani creano scene della Natività con dettagli straordinari."
            category="ecosystem"
            location="Napoli"
            image={{
              uri: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800',
            }}
            onPress={() => {
              handlePress('Presepe napoletano');
            }}
          />

          <HeritageCard
            title="Pizzaioli napoletani"
            subtitle="Arte culinaria tradizionale"
            description="L'arte del pizzaiolo napoletano è riconosciuta dall'UNESCO come patrimonio dell'umanità."
            category="culture"
            location="Napoli"
            image={{
              uri: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96a47?w=800',
            }}
            onPress={() => {
              handlePress('Pizzaioli napoletani');
            }}
          />

          <HeritageCard
            title="Canto tradizionale"
            subtitle="Musica popolare"
            description="La tradizione del canto napoletano rappresenta secoli di cultura e identità locale."
            category="tradition"
            location="Napoli"
            image={{
              uri: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
            }}
            onPress={() => {
              handlePress('Canto tradizionale');
            }}
          />
        </View>
      </View>

      {/* Minimal Examples */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4 text-text">
          Minimal Examples
        </Text>
        <Text className="text-sm text-text-secondary mb-4">
          Cards work great with minimal props too
        </Text>
        <View className="gap-4">
          <EventCard
            title="Minimal Event Card"
            onPress={() => {
              handlePress('Minimal Event');
            }}
          />

          <ExperienceCard
            title="Minimal Experience"
            onPress={() => {
              handlePress('Minimal Experience');
            }}
          />

          <HeritageCard
            title="Minimal Heritage"
            onPress={() => {
              handlePress('Minimal Heritage');
            }}
          />
        </View>
      </View>

      {/* Custom Styling */}
      <View className="mb-8">
        <Text className="text-xl font-semibold mb-4 text-text">
          Custom Styling
        </Text>
        <View className="gap-4">
          <Card
            variant="elevated"
            className="border-2 border-primary bg-primary/5">
            <Text className="text-base text-primary font-semibold">
              Custom Styled Card
            </Text>
            <Text className="text-sm text-text-secondary mt-2">
              You can override styles with className prop
            </Text>
          </Card>
        </View>
      </View>
    </View>
  );
};
