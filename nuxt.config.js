export default {
    components: true,
    head: {
        titleTemplate: "Mastering Nuxt: %s",
        htmlAttrs: {
            Lang: "en"
        },
        bodyAttrs: {
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8",
        }]
    },
    router: {
        prefetchLinks: false
    },
    plugins: [
        '~/plugins/maps.client', '~/plugins/dataApi', '~/plugins/auth.client'
    ],
    modules: ['~/modules/auth', '~/modules/algolia'],
    buildModules: ['@nuxtjs/tailwindcss'],
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0
        }
    },
    publicRuntimeConfig: {
        auth: {
            cookieName: 'idToken',
            clientId: '903056046126-503c0nqj5viam4imi9ttlbv4dugttk85.apps.googleusercontent.com',
        },
        algolia: {
            appId: 'D74IZ5NQVK',
            key: 'ae23788cf7f8585ffaa21c440599ed40'
        }
    },
    privateRuntimeConfig: {
        algolia: {
            appId: 'D74IZ5NQVK',
            key: '07e8f42109bbe9831b7b6d2fb506f33a'
        }
    },
}