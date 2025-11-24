import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus(callback?: (isOnline: boolean) => void) {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (callback) callback(!!state.isConnected);
    });
    return () => unsubscribe();
  }, [callback]);
}
