<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();
const showPassword = ref(false);

const register = async () => {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // 🔍 Check role before routing
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "admin") {
            router.push("/blogs");
        } else {
            router.push("/");
        }

    } catch (error) {
        console.log(error.code);
        alert(error.message);
    }
};

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "admin") {
            router.push("/blogs");
        } else {
            router.push("/");
        }
    } catch (error) {
        console.log(error);
        alert("Google sign-in failed.");
    }
};

const resetPassword = () => {
    if (!email.value){
        alert("Please enter your email to reset password");
        return
    }

    sendPasswordResetEmail(getAuth(), email.value)
        .then(() => {
            alert("Password reset email sent!")
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Log In To Your Account</h1>
  
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
  
        <div class="mb-6 relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 focus:outline-none pt-5"
            @click="showPassword = !showPassword"
          >
            <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </button>
        </div>
  
        <div class="space-y-3">
          <button
            @click="register"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
  
          <button
            @click="signInWithGoogle"
            class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Sign In with Google
          </button>
  
          <button
            @click="resetPassword"
            class="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  </template>
  