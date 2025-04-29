<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import logo from '@/assets/images/Brochill-removebg.png';

// Refs and State
const showDropdown = ref(false);
const isScrolled = ref(false);
const dropdownRef = ref(null);
const isLoggedIn = ref(false);
const isAdmin = ref(false);
const userEmail = ref('');
const userStatus = ref(''); // This will store 'Admin' or 'User'

const db = getFirestore();
const router = useRouter();
const route = useRoute();

// Dynamic computed value for user initial
const userInitial = computed(() =>
  userEmail.value ? userEmail.value.charAt(0).toUpperCase() : '?'
);

const isActiveLink = (path) => route.path === path;

// Navigation Links
const navLinks = [
  { to: '/', icon: 'pi pi-home', label: 'Home' },
  { to: '/blogs', icon: 'pi pi-book', label: 'Blog' },
  { to: '/contact', icon: 'pi pi-phone', label: 'Contact' }
];

// Computed Dropdown Links
const getDropdownLinks = computed(() => {
  if (!isLoggedIn.value) {
    return [
      { label: 'Sign Up', to: '/signup' },
      { label: 'Sign In', to: '/signin' }
    ];
  }

  return [
    { label: 'Dashboard', to: '/blogs/add' },
    { label: 'Log Out', to: '/', action: handleSignOut }
  ];
});

// Toggle Dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Click Outside Handler
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

// Scroll Handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

// Sign Out Logic
const handleSignOut = async () => {
  const auth = getAuth();
  await signOut(auth);
  isLoggedIn.value = false;
  userEmail.value = '';
  userStatus.value = '';
  router.push('/');
};

// Mounted Hook
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true;
      userEmail.value = user.email || '';

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        userStatus.value = data.role === 'admin' ? 'Admin' : 'User'; // Set user role status
        isAdmin.value = data.role === 'admin';
      } else {
        userStatus.value = 'User'; // Default to 'User' if no role found
      }
    } else {
      isLoggedIn.value = false;
      isAdmin.value = false;
      userEmail.value = '';
      userStatus.value = '';
    }
  });
});

// Cleanup
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav :class="[
    'fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-900 transition-colors duration-300',
    isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm' : 'bg-white dark:bg-gray-900'
  ]">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      
      <!-- Logo -->
      <RouterLink to="/" class="flex flex-shrink-0 items-center mr-4">
        <img :src="logo" alt="Brochill" class="h-10 w-auto" />
      </RouterLink>

      <!-- Desktop Nav -->
      <div class="hidden md:flex w-auto md:order-1">
        <ul class="flex flex-row md:space-x-8 font-medium p-0 bg-transparent">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              @click="showDropdown = false"
              :class="[
                isActiveLink(link.to)
                  ? 'underline underline-offset-[3px] text-yellow-300'
                  : 'text-white border border-transparent hover:border-yellow-400',
                'px-3 py-2 rounded-full'
              ]"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Mobile Nav -->
      <div class="flex md:hidden order-1">
        <ul class="flex flex-row space-x-2">
          <li v-for="link in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              @click="showDropdown = false"
              :class="[
                isActiveLink(link.to)
                  ? 'underline underline-offset-[3px] text-yellow-300'
                  : 'text-white border border-transparent hover:border-yellow-400',
                'px-5 py-2 rounded-full'
              ]"
            >
              <i :class="link.icon"></i>
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- User Dropdown -->
      <div class="relative flex items-center order-2" ref="dropdownRef">
        <button
          @click="toggleDropdown"
          type="button"
          class="text-sm bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold border border-transparent hover:border-yellow-400"
        >
          {{ userInitial }}
        </button>

        <div
          v-if="showDropdown"
          class="absolute right-0 top-10 z-50 mt-2 w-48 text-base bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
        >
          <div class="px-4 py-2">
            <span class="block text-sm text-gray-900">{{ userStatus }}</span> <!-- Display User status -->
            <span class="block text-sm text-gray-500">{{ userEmail }}</span>
          </div>
          <ul class="py-2 flex flex-col">
            <li
              v-for="item in getDropdownLinks"
              :key="item.label"
              @click="() => {
                showDropdown = false;
                item.action ? item.action() : router.push(item.to);
              }"
              :class="[
                isActiveLink(item.to) ? 'bg-gray-300' : 'bg-transparent',
                'px-4 py-2 hover:bg-gray-100 cursor-pointer'
              ]"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
