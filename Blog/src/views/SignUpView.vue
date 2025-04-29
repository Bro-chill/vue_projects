<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const showPassword = ref("");
const router = useRouter();
const db = getFirestore();
const auth = getAuth();

// Register with email/password
const register = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: "user",
            createdAt: new Date()
        });

        console.log("Successfully Registered!");
        router.push("/blogs");
    } catch (error) {
        console.error(error.code);
        alert(error.message);
    }
};

// Register or Sign in with Google
const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        // Only set default role if user doesn't already exist
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                role: "user",
                createdAt: new Date()
            });
        }

        router.push("/");
    } catch (error) {
        console.error(error);
        alert("Error during Google Sign-In: " + error.message);
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-semibold text-center mb-6">Create an Account</h1>
  
        <div class="space-y-4">
          <input
            type="text"
            placeholder="Email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <div class="mb-6 relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              v-model="password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 focus:outline-none"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </button>
          </div>
  
          <button
            @click="register"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Sign Up
          </button>
  
          <div class="text-center text-sm text-gray-500">or</div>
  
          <button
            @click="signInWithGoogle"
            class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.35 11.1h-9.18v2.92h5.34c-.23 1.2-1 2.21-2.13 2.88v2.4h3.45c2.02-1.86 3.2-4.6 3.2-7.8 0-.65-.06-1.28-.18-1.9z" />
              <path d="M12.17 22c2.4 0 4.42-.8 5.9-2.18l-3.45-2.4c-.96.64-2.18 1.02-3.45 1.02-2.65 0-4.9-1.8-5.7-4.22h-3.6v2.64c1.47 3 4.6 5.14 8.3 5.14z" />
              <path d="M6.47 13.22a5.99 5.99 0 010-3.44v-2.66H2.88A9.96 9.96 0 002 12c0 1.6.38 3.1 1.05 4.44l3.42-2.22z" />
              <path d="M12.17 5.96c1.31 0 2.5.44 3.43 1.31l2.56-2.56C16.56 3.08 14.53 2 12.17 2c-3.7 0-6.83 2.14-8.3 5.14l3.6 2.64c.8-2.42 3.05-4.22 5.7-4.22z" />
            </svg>
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  </template>
  
