/** @type {import('tailwindcss').Config} */
/** @type {import('./utils/generate-tailwind-palette')} */
/** @type {import('tailwindcss/plugin')} */
const plugin = require("tailwindcss/plugin");

const generateTailwindPalette = require("./utils/generate-tailwind-palette");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layout/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            italiana: ["Italiana", "sans-serif"],
            bodoni: ["Libre Bodoni", "sans-serif"],
        },
        extend: {
            colors: {...generateTailwindPalette()}
        },
    },
    plugins: [
        plugin(function ({matchVariant}) {
            matchVariant("min", (value) => `@media (min-width: ${value})`, {
                sort(a, z) {
                    return parseInt(a) - parseInt(z);
                }
            });
            matchVariant("max", (value) => `@media (max-width: ${value})`, {
                sort(a, z) {
                    return parseInt(a) - parseInt(z);
                }
            });
        }),
        // plugin(({addVariant}) => {
        //     addVariant('hocus', ['&:hover', '&:focus']);
        // })
    ]
}