import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',                 // <-- needed for UModal/UButton
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@dargmuesli/nuxt-cookie-control',
  ],

    hub: {
    db: {
      dialect: 'postgresql',
      driver: 'postgres-js',
      applyMigrationsDuringBuild: false,
    },
  },

  css: [
    
    './app/assets/css/main.css',
    './app/assets/css/custom.css',
    './app/assets/css/cookie-control.css',
  ],

  runtimeConfig: {
    public: {
      shippingCostCents: 4200,
      mainDomain: process.env.PUBLIC_MAIN_DOMAIN,
      fontUrl: process.env.PUBLIC_FONT_URL,
      plausibleScript: process.env.PUBLIC_PLAUSIBLE_SCRIPT,
      stonedPiranhaVideoUrl: process.env.PUBLIC_STONED_PIRANHA_VIDEO_URL,
      leakyFormsEndpoint: process.env.PUBLIC_LEAKY_FORMS_ENDPOINT,
      trackingEndpoint: process.env.PUBLIC_TRACKING_ENDPOINT,
    },
  },

  app: {
    head: {
      titleTemplate: '%s - Privatepiranha.Pics',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'The best store for buying piranha pictures. Pay nothing - receive nothing. A training environment.',
        },

        // Twitter
        { name: 'twitter:site', content: '@privatepiranhapics' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:url', content: 'https://private-piranha.pics/' },
        { name: 'twitter:title', content: 'Private Piranha Pics' },
        {
          name: 'twitter:description',
          content:
            'The best store for buying piranha pictures. Pay nothing - receive nothing. A training environment.',
        },
        { name: 'twitter:image', content: '/icon.png' },

        // Open Graph
        { property: 'og:site_name', content: 'Private Piranha Pics' },
        { property: 'og:type', content: 'website' },
        {
          // Use env at build-time (same as your snippet)
          property: 'og:url',
          content: `https://${process.env.PUBLIC_MAIN_DOMAIN}/`,
        },
        { property: 'og:title', content: 'Private Piranha Pics' },
        {
          property: 'og:description',
          content:
            'The best store for buying piranha pictures. Pay nothing - receive nothing. A training environment.',
        },
        { property: 'og:image', content: '/icon.png' },
        { property: 'og:image:width', content: '740' },
        { property: 'og:image:height', content: '300' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
    },
  },

  cookieControl: {
    isCookieIdVisible: true,
    barPosition: 'bottom-full',
    localeTexts: {
      en: { manageCookies: 'Manage cookies' },
    },
    cookies: {
      necessary: [
        {
          id: 'nuxt-session',
          name: 'Essential Cookies',
          description: 'These cookies are needed for the stores functionality.',
          targetCookieIds: [
            'nuxt-session',
            'cookie_control_consent',
            'cookie_control_enabled_cookies',
          ],
        },
      ],
      optional: [
        {
          id: 'aud',
          name: 'Audiences',
          description:
            'We use the service Audeinces Ltd. to display ads. Audeinces creates a profile about your interests by recording and storing your internet usage and interests for one year.',
          isPreselected: true,
        },
      ],
    },
  },

  nitro: {
    experimental: { tasks: true },
    scheduledTasks: process.env.NODE_ENV === 'production'
      ? {
          '0 6 * * *': ['db:reset', 'db:seed'],
          '15 * * * *': ['order:deliver'],
        }
      : {},
  },

  vite: {
    plugins: [tailwindcss()],
  },
})

//import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
/* export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxthub/core',
        'nuxt-auth-utils',
        '@pinia/nuxt',
        '@dargmuesli/nuxt-cookie-control',
    ],
    css: [
        './app/assets/css/main.css',
        './app/assets/css/custom.css',
        './app/assets/css/cookie-control.css',
    ],
    hub: {
        db: {
            dialect: 'postgresql',
            driver: 'postgres-js',
            applyMigrationsDuringBuild: false,
        },
    },
    runtimeConfig: {
        public: {
            shippingCostCents: 4200,
            mainDomain: process.env.PUBLIC_MAIN_DOMAIN,
            fontUrl: process.env.PUBLIC_FONT_URL,
            plausibleScript: process.env.PUBLIC_PLAUSIBLE_SCRIPT,
            stonedPiranhaVideoUrl: process.env.PUBLIC_STONED_PIRANHA_VIDEO_URL,
            leakyFormsEndpoint: process.env.PUBLIC_LEAKY_FORMS_ENDPOINT,
            trackingEndpoint: process.env.PUBLIC_TRACKING_ENDPOINT,
        },
    },
    app: {
        head: {
            titleTemplate: '%s - Privatepiranha.Pics',
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    name: 'description',
                    content:
                        'The best store for buying piranha pictures. Pay nothing - receive nothing. A training environment.',
                },

                // Twitter SEO
                { name: 'twitter:site', content: '@privatepiranhapics' },
                { name: 'twitter:card', content: 'summary' },
                {
                    name: 'twitter:url',
                    content: 'https://private-piranha.pics/',
                },
                {
                    name: 'twitter:title',
                    content: 'Private Piranha Pics',
                },
                {
                    name: 'twitter:description',
                    content:
                        'The best store for buying piranha pictures. Pay nothing - receive nothing. A training environment.',
                },
                {
                    name: 'twitter:image',
                    content: '/icon.png',
                },

                // Open Graph SEO
                { property: 'og:site_name', content: 'Private Piranha Pics' },
                { property: 'og:type', content: 'website' },
                {
                    property: 'og:url',
                    content: `https://${process.env.PUBLIC_MAIN_DOMAIN}/`,
                },
                {
                    property: 'og:title',
                    content: 'Private Piranha Pics',
                },
                {
                    property: 'og:description',
                    content:
                        'The best store for buying piranha pictures. Pay nothing - receive nothing. A training environment.',
                },
                {
                    property: 'og:image',
                    content: '/icon.png',
                },
                { property: 'og:image:width', content: '740' },
                { property: 'og:image:height', content: '300' },
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/icon.png',
                },
            ],
        },
    },
    cookieControl: {
        isCookieIdVisible: true,
        barPosition: 'bottom-full',
        localeTexts: {
            en: {
                manageCookies: 'Manage cookies',
            },
        },
        cookies: {
            necessary: [
                {
                    id: 'nuxt-session',
                    name: 'Essential Cookies',
                    description:
                        'These cookies are needed for the stores functionality.',
                    targetCookieIds: [
                        'nuxt-session',
                        'cookie_control_consent',
                        'cookie_control_enabled_cookies',
                    ],
                },
            ],
            optional: [
                {
                    id: 'aud',
                    name: 'Audiences',
                    description:
                        'We use the service Audeinces Ltd. to display ads. Audeinces creates a profile about your interests by recording and storing your internet usage and interests for one year.',
                    isPreselected: true,
                },
            ],
        },
    },
    nitro: {
        scheduledTasks: {
            '0 6 * * *': ['db:reset', 'db:seed'],
            '15 * * * *': ['order:deliver'],
        },
        experimental: {
            tasks: true,
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
});
 */