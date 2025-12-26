export default defineAppConfig({
  global: {
    picture: {
      dark: 'avatar.jpg',
      light: 'avatar.jpg',
      alt: 'My profile picture',
    },
    email: 'dufourarthur.perso@gmail.com',
    available: false,
  },
  ui: {
    colors: {
      primary: 'purple',
      neutral: 'gray',
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description:
          'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted',
      },
    },
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/adufr',
        target: '_blank',
        'aria-label': 'My GitHub profile',
      },
      {
        icon: 'i-simple-icons-bluesky',
        to: 'https://bsky.app/profile/arthurdufour.dev',
        target: '_blank',
        'aria-label': 'My Bluesky profile',
      },
      {
        icon: 'i-simple-icons-linkedin',
        to: 'https://www.linkedin.com/in/arthur-dufour/',
        target: '_blank',
        'aria-label': 'My LinkedIn profile',
      },
    ],
  },
})
