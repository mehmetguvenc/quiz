module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        '@nuxtjs/eslint-config-typescript'
    ],
    plugins: [
        'vue',
        '@typescript-eslint'
    ],
    // add your custom rules here
    rules: {},
}