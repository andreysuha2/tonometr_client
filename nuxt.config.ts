// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
    devtools: { enabled: true },
    css: [ "@/assets/scss/main.scss" ],
    modules: [ '@pinia/nuxt' ],
    build: {
        transpile: [ 'vuetify' ]
    },
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    }
})
