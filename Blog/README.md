# My_Blog

### CRUD, authentication and authorization

Dependencies
```bash
npm i axios json-server primeicons uuid vue-router vue-spinner vue-toastification@next firebase
```

Run JSON on local server (json-server)
package.json
```bash
"scripts":{
  "server": "json-server --watch src/blogs.json --port 8000"
}
```
vite.config.js
```bash
server: {
  proxy: {
    '/api':{
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    },
  },
},
```
