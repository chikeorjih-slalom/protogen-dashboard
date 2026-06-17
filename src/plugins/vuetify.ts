import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const lightTheme = {
  dark: false,
  colors: {
    background: '#f6f7f9',
    surface: '#ffffff',
    primary: '#111827',
    revenue: '#16a34a',
    visitors: '#2563eb',
    conversions: '#9333ea',
    orders: '#ea580c',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#0f1115',
    surface: '#1a1d23',
    primary: '#f9fafb',
    revenue: '#22c55e',
    visitors: '#3b82f6',
    conversions: '#a855f7',
    orders: '#f97316',
  },
}

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: { lightTheme, darkTheme },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  defaults: {
    VCard: {
      rounded: 'lg',
      elevation: 0,
    },
  },
})
