Single Page Application(SPA) with CRUD

1. Create vue
```bash
npm create vue@latest <project_name>
cd <project_name>
npm i
npm run dev
```
2. Install tailwind
```bash
npm i -D tailwindcss@3 postcss autoprefixer
npx tailwind init -p
```
2.1 Update tailwind.config.js (content & theme)
```bash
content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
```
3. Install dependencies
```bash
npm i primeicons
npm i vue-router
npm i json-server
npm i axios
npm i vue-spinner
npm i vue-toastification@next
```
3.1 Update package.json (add server under scripts)
```bash
"server": "json-server --watch src/jobs.json --port 8000"
```
3.2 Update vite.config.js (add proxy under server)
```bash
proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
```

## Notes
components -> views -> router -> App.vue
C = post
R = get
U = put
D = delete
