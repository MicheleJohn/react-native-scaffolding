import React from 'react';
import { View, Text } from 'react-native';
import * as Sentry from '@sentry/react-native';

type ErrorBoundaryProps = { children: React.ReactNode };
type ErrorBoundaryState = { hasError: boolean };

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}>Qualcosa è andato storto.</Text>
          <Text>Riprova oppure contatta il supporto.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
