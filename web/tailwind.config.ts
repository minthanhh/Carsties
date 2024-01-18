import type { Config } from 'tailwindcss'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'
import flowbitePlugin from 'flowbite/plugin'

const config: Config = {
    important: true,
    content: ['node_modules/flowbite-react/lib/esm/**/*.js', './pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [tailwindAspectRatio, flowbitePlugin],
}
export default config
