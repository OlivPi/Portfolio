import { InitOptions } from 'i18next'

export const initOptions: InitOptions = {
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en'],
  debug: process.env.NODE_ENV === 'development',
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  react: {
    useSuspense: false,
  },
}
