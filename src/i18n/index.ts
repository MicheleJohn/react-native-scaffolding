import * as Localization from 'expo-localization';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import it from './locales/it.json';

const resources = {
  en: { translation: en },
  it: { translation: it },
};

const initI18n = () => {
  const languageDetector = {
    type: 'languageDetector' as const,
    async: true,
    detect: (callback: (lng: string) => void) => {
      const locale = Localization.getLocales()[0];
      const languageCode = locale.languageCode ?? 'en';
      callback(languageCode);
    },
    init: () => {
      /* empty */
    },
    cacheUserLanguage: () => {
      /* empty */
    },
  };

  void i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18n;
};

export default initI18n;
