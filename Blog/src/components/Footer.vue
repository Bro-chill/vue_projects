<script setup>
import { RouterLink } from 'vue-router';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="shadow-sm bg-gray-800 border-t-2 border-t-doted border-t-yellow-400">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm sm:text-center text-gray-400">
        © {{ currentYear }} Brochill. All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
        <li>
          <RouterLink 
            to="/signup"
            class="hover:underline me-4 md:me-6 text-gray-100">
            Sign Up
          </RouterLink>
        </li>
        <li>
          <RouterLink 
            to="/signin"
            class="hover:underline me-4 md:me-6 text-gray-100">
            Sign In
          </RouterLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
