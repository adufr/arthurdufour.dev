export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontaine',
    '@nuxtjs/plausible',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxtjs/robots',
  ],

  ui: {
  },

  icon: {
    componentName: 'NuxtIcon',
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en',
        class: 'h-full',
      },
      bodyAttrs: {
        class: 'antialiased bg-gray-50 dark:bg-black min-h-screen',
      },
    },
  },

  content: {
    highlight: {
      theme: 'github-dark',
    },
  },

  googleFonts: {
    display: 'swap',
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  plausible: {
    domain: 'arthurdufour.dev',
    apiHost: 'https://plausible.arthurdufour.dev',
  },

  hub: {
    blob: true,
  },

  compatibilityDate: '2024-11-13',
})
