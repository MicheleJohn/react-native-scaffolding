# Architecture Overview

## Project Structure

```
react-native-scaffolding/
├── src/
│   ├── app/              # Expo Router pages
│   ├── components/       # Reusable components
│   │   ├── ui/          # Base UI components
│   │   └── shared/      # Shared business components
│   ├── features/        # Feature modules
│   │   ├── auth/
│   │   ├── portals/
│   │   └── events/
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Third-party library configs
│   ├── services/        # API clients
│   ├── store/           # Global state (if needed)
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── i18n/            # Internationalization
│   └── config/          # App configuration
├── assets/             # Static assets
├── docs/               # Documentation
└── android/            # Native Android code
└── ios/                # Native iOS code
```

## Design Patterns

### Feature-Based Architecture

Each feature is self-contained with its own:
- Components
- Hooks
- Schemas (validation)
- Types
- API calls

Example:
```
features/auth/
├── components/
│   └── LoginForm.tsx
├── hooks/
│   └── use-auth.ts
├── schemas/
│   └── login-schema.ts
└── types/
    └── auth.types.ts
```

### State Management

- **Server State**: TanStack Query
- **Client State**: React Context or Zustand (if needed)
- **Form State**: React Hook Form

### Routing

- **File-based routing**: Expo Router
- **Type-safe navigation**: TypeScript integration
- **Deep linking**: Built-in support

## Data Flow

```
UI Component
    ↓
Custom Hook (TanStack Query)
    ↓
API Service
    ↓
API Client
    ↓
Backend API
```

## Key Technologies

### UI Layer
- **React Native**: Core framework
- **NativeWind**: Styling (Tailwind CSS)
- **React Hook Form**: Form management
- **Zod**: Schema validation

### Data Layer
- **TanStack Query**: Server state management
- **Axios/Fetch**: HTTP client

### Navigation
- **Expo Router**: File-based routing
- **React Navigation**: Under the hood

### Developer Experience
- **TypeScript**: Type safety
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Husky**: Git hooks

### Monitoring
- **Sentry**: Error tracking
- **Performance monitoring**: Built-in

## Best Practices

### Component Structure

```tsx
// 1. Imports (grouped)
import { useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

// 2. Types
type Props = {
  title: string;
};

// 3. Component
export function MyComponent({ title }: Props) {
  const { t } = useTranslation();
  const [state, setState] = useState();

  // 4. Handlers
  const handlePress = () => {};

  // 5. Render
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
```

### Custom Hook Pattern

```tsx
export function useMyFeature() {
  const query = useQuery({
    queryKey: ['my-feature'],
    queryFn: fetchData,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
```

### API Service Pattern

```tsx
export const myService = {
  getAll: () => apiClient.get('/endpoint'),
  getById: (id: string) => apiClient.get(`/endpoint/${id}`),
  create: (data: CreateDTO) => apiClient.post('/endpoint', data),
  update: (id: string, data: UpdateDTO) =>
    apiClient.put(`/endpoint/${id}`, data),
  delete: (id: string) => apiClient.delete(`/endpoint/${id}`),
};
```
