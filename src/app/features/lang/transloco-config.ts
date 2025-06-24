import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

export enum AvailableLanguages {
  ES = 'es',
  EN = 'en',
}

export const AvaliableLanguages = [
  AvailableLanguages.ES,
  AvailableLanguages.EN,
];

const config: TranslocoGlobalConfig = {
  langs: AvaliableLanguages,
  defaultLang: AvailableLanguages.ES,
  rootTranslationsPath: 'assets/i18n',
};

export default config;
