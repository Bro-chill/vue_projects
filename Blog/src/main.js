import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
import Toast from 'vue-toastification';

import {initializeApp} from 'firebase/app';

import 'vue-toastification/dist/index.css';
import 'primeicons/primeicons.css'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router);
app.use(Toast);
app.mount('#app')
