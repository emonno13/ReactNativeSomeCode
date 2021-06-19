import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { call } from 'react-native-reanimated';

import en from '../Language/Languages/english.json';
import vi from '../Language/Languages/vi.json';

type languageDetectorType = {
  type: any;
  async: boolean;
  detect: (callback: Function) => unknown;
  init: () => void;
  cacheUserLanguage: () => void;
};

const languageDetector: languageDetectorType = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const language = await AsyncStorage.getItem('@appLanguage').catch((e) =>
      console.log(e),
    );
    const defaultLanguage = 'vi';

    if (!language) {
      await AsyncStorage.setItem('@appLanguage', defaultLanguage);
      return callback(defaultLanguage);
    }

    return callback(language);
  },
  // detect: callback => {
  //   return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => {
  //     callback(locale);
  //   });
  // },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: en,
      },
      vi: {
        translations: vi,
      },
    },
    fallbackLng: 'vi',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
