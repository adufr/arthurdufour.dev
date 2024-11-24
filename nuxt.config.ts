export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontaine',
    '@nuxtjs/plausible',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    '@nuxthub/core',
    '@nuxt/eslint',
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

  schemaOrg: {
    identity: {
      '@type': 'Person',

      'name': 'Arthur Dufour',
      'givenName': 'Arthur',
      'familyName': 'Dufour',

      'image': '/avatar.jpg',
      'description': 'Full-stack developer, passionate about building useful and beautiful things.',
      'jobTitle': 'Full-stack Developer',

      'email': 'dufourarthur.perso@gmail.com',
      'url': 'https://arthurdufour.dev',
      'sameAs': [
        'https://github.com/adufr',
        'https://bsky.app/profile/arthurdufour.dev',
        'https://www.linkedin.com/in/arthur-dufour/',
      ],

      'worksFor': {
        '@type': 'Organization',
        'name': '365Talents',
        'url': 'https://365talents.com',
      },
    },
  },

  compatibilityDate: '2024-11-13',
})
