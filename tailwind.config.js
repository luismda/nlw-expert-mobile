/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: 'Inter_600SemiBold',

        'body-bold': 'Inter_700Bold',
        'body-medium': 'Inter_500Medium',
        'body-regular': 'Inter_400Regular',
      },
    },
  },
  plugins: [],
}
