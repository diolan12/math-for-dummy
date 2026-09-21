import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#6366f1', // Indigo accent
          secondary: '#10b981', // Emerald accent
          accent: '#ec4899', // Pink accent
          warning: '#f59e0b', // Amber warning
          error: '#ef4444',
          info: '#3b82f6',
          success: '#10b981',
          background: '#0f172a', // Slate 900
          surface: '#1e293b', // Slate 800
          'surface-variant': '#334155',
        },
      },
      light: {
        colors: {
          primary: '#4f46e5',
          secondary: '#059669',
          accent: '#db2777',
          background: '#f8fafc',
          surface: '#ffffff',
        },
      },
    },
  },
})
