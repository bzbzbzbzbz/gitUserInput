// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: [
        '@/assets/styles/reset.scss',
        '@/assets/styles/fonts.scss',
        '@/assets/styles/vars.scss'
    ]
})
