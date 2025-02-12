/** @type {import("prettier").Config} */

export default {
    plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: "astro",
                singleQuote: true,
                jsxSingleQuote: true,
                tabWidth: 2,
                semi: false,
                bracketSpacing: true,
                singleAttributePerLine: true,
            },
        },
    ],
};