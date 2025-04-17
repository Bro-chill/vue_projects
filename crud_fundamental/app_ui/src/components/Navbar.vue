<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { onMounted, ref } from 'vue';

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}

const isLoggedIn = ref(false);
const router = useRouter();

let auth;
onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if(user){
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    });
});

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push("/")
    });
};
</script>

<template>
    <nav class="bg-gray-500">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <RouterLink to="/" class="flex flex-shrink-0 items-center mr-4">
                        <span class="hidden md:block text-yellow-500 text-2xl font-bold ml-2">
                            CRUD
                        </span>
                    </RouterLink>
                    <!-- Landing Page -->
                    <div class="md:mx-auto">
                        <div class="flex space-x-2">
                            <RouterLink to="/" :class="[isActiveLink('/') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']">
                                Home
                            </RouterLink>
                            <RouterLink to="/edit" :class="[isActiveLink('/edit') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']">
                                Edit
                            </RouterLink>
                        </div>
                    </div>
                    <!-- LogIn/SignUp -->
                    <div>
                        <div class="flex space-x-2">
                            <RouterLink v-if="!isLoggedIn" to="/signup" :class="[isActiveLink('/signup') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']">
                                Sign Up
                            </RouterLink>
                            <RouterLink v-if="!isLoggedIn" to="/login" :class="[isActiveLink('/login') ? 'bg-green-900' : 'hover:bg-gray-900 hover:text-white', 'text-white', 'px-3', 'py-2', 'rounded-md']">
                                Log In
                            </RouterLink>
                            <button @click="handleSignOut" v-if="isLoggedIn">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>