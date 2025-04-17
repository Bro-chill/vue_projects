## Dependencies
1. vue-router
2. axios
3. firebase
4. vue-toastification
```bash
npm i vue-router axios firebase vue-toastification@nexy
```

## Tailwindcss
```bash
npm i -D tailwindcss@3 postcss autoprefixer
```
```bash
npx tailwind init -p
```
tailwind.config.js
```bash
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
}
```
src/assets/main.css
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
