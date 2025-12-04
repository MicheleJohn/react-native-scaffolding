# React Native Scaffolding

🚀 Production-ready React Native scaffolding with modern tools and best practices.

## 📱 Stack Tecnologico

- **React Native 0.76+** con Hermes Engine
- **Expo SDK 52** per sviluppo rapido e deployment semplificato
- **React 19** + TypeScript per type safety
- **Expo Router 4** per navigazione file-based con deep linking integrato
- **TanStack Query v5** per state management server-side
- **React Hook Form** + **Zod** per gestione form e validazione
- **NativeWind v4** (Tailwind CSS per React Native) con **Dark Mode**
- **i18next** per internazionalizzazione
- **Sentry** per error tracking e monitoring
- **React Native WebView** per integrare portali web
- **🎨 Automated Icon System** con SVGR per icone custom da Figma

## 🌙 Dark Mode

Supporto completo per dark mode con **NativeWind**, integrato automaticamente in tutta l'app.

### ✨ Features

- ✅ **Tre modalità**: Light, Dark, System (segue device)
- ✅ **Persistenza**: Preferenza salvata in AsyncStorage
- ✅ **Auto-applicata**: Tutte le pagine supportano dark mode
- ✅ **CSS Variables**: Colori che si adattano automaticamente
- ✅ **Tailwind `dark:` prefix**: Già applicato ovunque
- ✅ **Theme Toggle**: Icona in alto a destra per cambiare tema

### 💻 Usage

**1. Cambia tema dall'app:**
Clicca l'icona sole/luna in alto a destra nella home page

**2. Usa `dark:` prefix nei tuoi componenti:**
```tsx
<View className="bg-white dark:bg-neutral-900">
  <Text className="text-neutral-900 dark:text-neutral-50">
    Testo che si adatta al tema
  </Text>
</View>
```

**3. Usa CSS Variables (auto-adapting):**
```tsx
<View className="bg-background">
  <Text className="text-primary-text">
    Usa variabili che cambiano col tema
  </Text>
</View>
```

**4. Usa useTheme Hook:**
```tsx
import { useTheme } from '@/providers';

function MyComponent() {
  const { isDark, colorScheme, setThemeMode } = useTheme();
  
  return (
    <View>
      <Text>Tema corrente: {colorScheme}</Text>
      <Button onPress={() => void setThemeMode('dark')}>
        Switch a Dark
      </Button>
    </View>
  );
}
```

📚 **[Guida Completa Dark Mode](./docs/DARK_MODE.md)** - Setup, customization, best practices

---

## 🏗️ Architettura

```
src/
├── app/              # Expo Router (file-based routing)
├── components/       # Componenti UI riutilizzabili
│   ├── ui/          # Componenti base del design system
│   ├── icons/       # 🤖 Auto-generated icons (do not edit)
│   └── shared/      # Componenti condivisi tra features
├── features/        # Feature modules (domain-driven)
│   ├── auth/
│   ├── portals/
│   └── events/
├── hooks/           # Custom React hooks
├── lib/             # Configurazioni librerie esterne
├── providers/       # React Context providers (Theme, etc.)
├── services/        # API clients e servizi
├── store/           # State management (Zustand/Context)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── i18n/            # Traduzioni e configurazione i18n
└── config/          # Configurazioni app

assets/
└── icons/           # 📁 SVG source files (export from Figma)

scripts/
├── generate-icons.js # Icon generation automation
└── clean-icons.js    # Icon cleanup utility
```

## 🚀 Getting Started

### Prerequisiti

- Node.js 20+ (gestito con Volta)
- pnpm 10+
- Expo CLI

### Installazione

```bash
# Installa Volta (se non presente)
curl https://get.volta.sh | bash

# Clona il repository
git clone https://github.com/MicheleJohn/react-native-scaffolding.git
cd react-native-scaffolding

# Installa dipendenze
# ⚡ Icons vengono generati automaticamente dopo install (postinstall hook)
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

# Icon management
pnpm icons:generate # Genera componenti React Native da SVG
pnpm icons:clean    # Rimuove componenti generati
```

## 🎨 Icon System (Automated)

Questo progetto include un **sistema automatizzato di generazione icone** che converte SVG esportati da Figma in componenti React Native TypeScript type-safe.

### Quick Start Icons

```bash
# 1. Aggiungi SVG da Figma a assets/icons/
cp ~/Downloads/my-icon.svg assets/icons/

# 2. Genera componenti (auto-run dopo pnpm install)
pnpm run icons:generate

# 3. Usa nel codice
import { MyIcon } from '@/components/icons';
<MyIcon size={24} color="#009FE3" />
```

**📚 Documentazione Completa:** Vedi [`docs/ICON_SYSTEM.md`](./docs/ICON_SYSTEM.md)

---

## 🔍 TanStack Query v5

Questo scaffolding usa **TanStack Query** (React Query) per gestire lo stato server-side con caching automatico, background updates, e polling.

### 🎯 Live Demo

**Demo interattiva completa disponibile!**

Esegui l'app e naviga a `/tanstack-demo` per vedere:
- ♾️ **Infinite Queries** - Pagination con "Load More"
- 🔎 **Search Queries** - Debounced search con cache (5min)
- 🔄 **Polling** - Auto-refresh ogni 10 secondi
- ✏️ **Mutations** - POST con cache invalidation
- 📱 **React Hook Form** - Form validation con Zod

### 📚 Documentazione Completa

**Impara i pattern TanStack Query:**
- **[TanStack Query Guide](./docs/TANSTACK_QUERY.md)** - Guida completa con esempi

---

## 📝 Form Management con React Hook Form + Zod

Gestione form type-safe con validazione runtime usando **React Hook Form** e **Zod**.

### 📚 Documentazione Completa

**Impara i pattern form:**
- **[Form Management Guide](./docs/FORMS.md)** - Guida completa React Hook Form + Zod

---

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

## 🎨 Styling con NativeWind

```tsx
import { View, Text } from 'react-native';

<View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
  <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
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

### Free Native Builds (GitHub Actions)

Questo progetto include workflow GitHub Actions per build **GRATUITE** iOS e Android!

```bash
# Vai su GitHub Actions → Build React Native (Free)
# Seleziona platform (android/ios) e build type
# Download APK/IPA da Artifacts
```

**Vedi documentazione completa:**
- **📦 [App Distribution Guide](./docs/APP_DISTRIBUTION.md)** - Come distribuire e installare le app
- [Build Strategies](./docs/BUILD_STRATEGIES.md) - Comparazione metodi build
- [iOS Signing Setup](./docs/IOS_SIGNING_SETUP.md) - Setup certificati iOS
- [Build Caching Guide](./docs/BUILD_CACHING_GUIDE.md) - Ottimizzazioni cache

### EAS Build (Alternative)

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

**Note:** Icons vengono generati automaticamente durante build CI/CD.

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

### CI/CD Pipeline

GitHub Actions verifica automaticamente:
- ✅ Icon generation (postinstall)
- ✅ Linting
- ✅ Type checking
- ✅ Tests
- ✅ Build

## 📚 Documentazione

### Guide Complete

- **[Dark Mode Guide](./docs/DARK_MODE.md)** - Light, dark, system modes con NativeWind
- **[TanStack Query Guide](./docs/TANSTACK_QUERY.md)** - Queries, mutations, patterns, best practices
- **[Form Management Guide](./docs/FORMS.md)** - React Hook Form + Zod validation completa
- **[Examples & Patterns](./docs/EXAMPLES.md)** - Feature modules, hooks, componenti
- **[Icon System](./docs/ICON_SYSTEM.md)** - Automated icon generation
- **[Design System](./README_DESIGN_SYSTEM.md)** - CVA, NativeWind, UI components

### Build & Deploy

- **[App Distribution](./docs/APP_DISTRIBUTION.md)** - Come installare e distribuire app
- **[Build Strategies](./docs/BUILD_STRATEGIES.md)** - Comparazione metodi build
- **[iOS Signing](./docs/IOS_SIGNING_SETUP.md)** - Setup certificati iOS
- **[Build Caching](./docs/BUILD_CACHING_GUIDE.md)** - Ottimizzazioni build
- **[CI/CD](./docs/CI_CD.md)** - GitHub Actions setup

### Troubleshooting

- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Problemi comuni e soluzioni
- **[NativeWind Issues](./docs/NATIVEWIND_TROUBLESHOOTING.md)** - Fix styling problems

## 🤝 Contributing

1. Fork il progetto
2. Crea un feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

**Note per Contributors:**
- 📁 Committa solo SVG in `assets/icons/`, NON i TSX generati
- 🤖 I componenti in `src/components/icons/` sono auto-generati
- ✅ CI verificherà che icon generation funzioni

## 📝 License

MIT

## 🙋‍♂️ Support

Per domande o problemi, apri una issue su GitHub.

---

**✨ Features Highlight:**
- 🚀 Production-ready scaffolding
- 🌙 **Dark Mode** - Auto-applied everywhere with `dark:` classes
- 🔍 **TanStack Query** - Complete demo with real APIs
- 📝 **React Hook Form + Zod** - Type-safe form validation
- 🎨 Automated icon generation from Figma
- 📱 Cross-platform (iOS, Android, Web)
- 🔒 Security best practices
- 🧪 Full testing setup
- 📚 **Comprehensive documentation** with guides
- 🤖 CI/CD with GitHub Actions
- 💰 **FREE native builds** (no EAS subscription needed!)
