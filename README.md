# React Native Scaffolding

🚀 Production-ready React Native scaffolding with modern tools and best practices.

## 📱 Stack Tecnologico

- **React Native 0.76+** con Hermes Engine
- **Expo SDK 52** per sviluppo rapido e deployment semplificato
- **React 19** + TypeScript per type safety
- **Expo Router 4** per navigazione file-based con deep linking integrato
- **TanStack Query v5** per state management server-side
- **React Hook Form** + **Zod** per gestione form e validazione
- **NativeWind v4** (Tailwind CSS per React Native)
- **i18next** per internazionalizzazione
- **Sentry** per error tracking e monitoring
- **React Native WebView** per integrare portali web

## 🏗️ Architettura

```
src/
├── app/              # Expo Router (file-based routing)
├── components/       # Componenti UI riutilizzabili
│   ├── ui/          # Componenti base del design system
│   └── shared/      # Componenti condivisi tra features
├── features/        # Feature modules (domain-driven)
│   ├── auth/
│   ├── portals/
│   └── events/
├── hooks/           # Custom React hooks
├── lib/             # Configurazioni librerie esterne
├── services/        # API clients e servizi
├── store/           # State management (Zustand/Context)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── i18n/            # Traduzioni e configurazione i18n
└── config/          # Configurazioni app
```

## 🚀 Getting Started

### Prerequisiti

- Node.js 20+ (gestito con Volta)
- pnpm 9+
- Expo CLI

### Installazione

```bash
# Installa Volta (se non presente)
curl https://get.volta.sh | bash

# Clona il repository
git clone https://github.com/MicheleJohn/react-native-scaffolding.git
cd react-native-scaffolding

# Installa dipendenze (Volta gestirà automaticamente Node e pnpm)
pnpm install

# Avvia il progetto
pnpm start
```

### Script Disponibili

```bash
pnpm start          # Avvia Expo Dev Server
pnpm android        # Avvia su Android
pnpm ios            # Avvia su iOS
pnpm web            # Avvia su Web

pnpm lint           # Esegue ESLint
pnpm lint:fix       # Fix automatico problemi ESLint
pnpm format         # Formatta codice con Prettier
pnpm format:check   # Controlla formattazione
pnpm type-check     # Verifica tipi TypeScript
pnpm test           # Esegue test
```

## 🔧 Configurazione

### Environment Variables

Crea un file `.env` nella root:

```env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_SENTRY_DSN=your-sentry-dsn
EXPO_PUBLIC_ENV=development
```

### Sentry Setup

1. Crea un account su [sentry.io](https://sentry.io)
2. Crea un nuovo progetto React Native
3. Aggiungi il DSN in `.env`
4. Configura in `src/lib/sentry.ts`

### i18n Setup

Le traduzioni sono in `src/i18n/locales/`:

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<Text>{t('welcome.title')}</Text>
```

## 📱 Features

### Deep Linking

Configura deep links in `app.json` e usa `expo-linking`:

```typescript
import * as Linking from 'expo-linking';

const url = Linking.createURL('path/into/app');
```

### WebView Integration

Per aprire portali esterni:

```typescript
import { WebView } from 'react-native-webview';

<WebView source={{ uri: 'https://example.com' }} />
```

### Form Management

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## 🎨 Styling con NativeWind

```tsx
import { View, Text } from 'react-native';

<View className="flex-1 items-center justify-center bg-white">
  <Text className="text-2xl font-bold text-blue-600">
    Hello World
  </Text>
</View>
```

## 🔒 Security

- **iOS**: App Transport Security configurato
- **Android**: ProGuard/R8 obfuscation abilitato
- **Validazione input**: Zod schemas per tutti i form
- **Secure Storage**: expo-secure-store per dati sensibili

## 📦 Build & Deploy

### EAS Build

```bash
# Installa EAS CLI
pnpm add -g eas-cli

# Login
eas login

# Configura progetto
eas build:configure

# Build per Android
eas build --platform android

# Build per iOS
eas build --platform ios
```

## 🧪 Testing

Setup Jest con React Native Testing Library:

```bash
pnpm test
pnpm test -- --coverage
```

## 📝 Code Quality

### Pre-commit Hooks

Husky + lint-staged verificano:
- ESLint su file TypeScript/TSX
- Prettier su tutti i file
- Type checking

### ESLint Rules

- Strict TypeScript rules
- React hooks best practices
- Import sorting automatico
- Unused imports detection
- TanStack Query best practices

## 🤝 Contributing

1. Fork il progetto
2. Crea un feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 License

MIT

## 🙋‍♂️ Support

Per domande o problemi, apri una issue su GitHub.
