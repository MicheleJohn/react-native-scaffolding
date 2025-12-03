# Design System - Componenti UI

## 📚 Panoramica

Questo design system include un set completo di componenti UI pronti all'uso, costruiti con NativeWind v4 e basati sui design tokens di Figma.

## 🎨 Sistema di Colori

### Colori Primari
- `#009FE3` - Cyan (default)
- `#28529C` - Blue
- `#0074A5` - Teal
- `#CC1A1A` - Red

### Colori Neutri
- `#FFFFFF` - White
- `#F2F4F7` - Gray 50
- `#98A2B3` - Gray 400
- `#344054` - Gray 700
- `#1D2939` - Gray 800
- `#0F172A` - Gray 900

### Colori Secondari
- `#E6F4FA` - Light Blue
- `#A6C48A` - Green
- `#F2C94C` - Yellow
- `#0F172A` - Dark Navy

## 🧩 Componenti Disponibili

### Button
Pulsanti con varianti e dimensioni multiple.

```tsx
import { Button } from '@/components/ui';

// Varianti
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Dimensioni
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Stati
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

### Card
Container per raggruppare contenuti.

```tsx
import { Card } from '@/components/ui';

<Card variant="default">
  <Text>Contenuto della card</Text>
</Card>

<Card variant="elevated">
  <Text>Card con ombra</Text>
</Card>

<Card variant="outlined">
  <Text>Card con bordo</Text>
</Card>
```

### Chip
Tag o filtri removibili.

```tsx
import { Chip } from '@/components/ui';

<Chip label="Pizza" variant="primary" />
<Chip label="Grafica" onRemove={() => console.log('removed')} />
<Chip label="Selected" selected />
```

### Input
Campo di input con label, errori e icone.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  placeholder="Enter your email"
  value={value}
  onChangeText={setValue}
  helperText="We'll never share your email"
/>

<Input
  label="Password"
  secureTextEntry
  error="Password is required"
/>

<Input
  placeholder="Search..."
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
  onRightIconPress={() => setValue('')}
/>
```

### Tabs
Tabs per navigazione tra sezioni.

```tsx
import { Tabs } from '@/components/ui';

const tabs = [
  { id: 'italiana', label: 'Italiana' },
  { id: 'inglese', label: 'Inglese' },
];

// Pills variant (come da Figma)
<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="pills"
/>

// Underline variant
<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="underline"
/>
```

### NavigationBar
Barra di navigazione con icone.

```tsx
import { NavigationBar } from '@/components/ui';

const items = [
  {
    id: 'home',
    icon: <HomeIcon />,
    onPress: () => navigate('home'),
    active: currentRoute === 'home',
  },
  // ... altri item
];

// Light variant (bianca)
<NavigationBar items={items} variant="light" />

// Dark variant (scura)
<NavigationBar items={items} variant="dark" />
```

## 🎯 Utilizzo con NativeWind

Tutti i componenti supportano la prop `className` per personalizzazioni:

```tsx
<Button className="mt-4 w-full">
  Custom Styled Button
</Button>

<Card className="mb-6 shadow-lg">
  <Text>Custom Card</Text>
</Card>
```

## 🎨 Colori Tailwind

Grazie alla configurazione di `tailwind.config.js`, puoi usare i colori del design system direttamente:

```tsx
<View className="bg-primary">        {/* #009FE3 */}
<View className="bg-primary-blue">   {/* #28529C */}
<View className="bg-neutral-50">     {/* #F2F4F7 */}
<View className="bg-secondary-green"> {/* #A6C48A */}

<Text className="text-text-primary">  {/* #0F172A */}
<Text className="text-text-secondary"> {/* #344054 */}

<View className="border-border">     {/* #98A2B3 */}
```

## 📦 Utility

### cn() - Class Name Merger

Utility per combinare classi Tailwind:

```tsx
import { cn } from '@/utils/cn';

<View
  className={cn(
    'p-4 rounded-lg',
    isActive && 'bg-primary',
    isDisabled && 'opacity-50'
  )}
/>
```

## 🎭 Esempio Completo

Vedi `src/components/ui/examples/ComponentShowcase.tsx` per un esempio completo di tutti i componenti.

## 📝 Best Practices

1. **Usa sempre i componenti del design system** invece di creare varianti custom
2. **Estendi con className** per personalizzazioni specifiche
3. **Rispetta i colori del design system** - usa le classi Tailwind predefinite
4. **Mantieni consistenza** - usa le stesse varianti in tutto il progetto

## 🚀 Prossimi Passi

Componenti in roadmap:
- Badge
- Avatar
- Modal/Dialog
- Toast/Notification
- Skeleton Loader
- Progress Bar
