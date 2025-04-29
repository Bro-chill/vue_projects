<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const handleSubmit = () => {
  console.log('Form submitted:', { name: name.value, email: email.value, message: message.value })
  alert('Thanks for reaching out!')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-500 via-gray-800 to-black text-white flex items-center justify-center px-4">
    <div class="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20">
      <h1 class="text-4xl font-extrabold mb-6 text-center text-white">Contact Us</h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-white mb-1">Name</label>
          <input v-model="name" type="text" class="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your Name" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-white mb-1">Email</label>
          <input v-model="email" type="email" class="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="you@example.com" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-white mb-1">Message</label>
          <textarea v-model="message" rows="5" class="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Write your message here..." required></textarea>
        </div>
        <button type="submit" class="w-full py-3 bg-pink-600 hover:bg-pink-700 transition-all rounded-lg font-semibold text-white shadow-lg">Send Message</button>
      </form>
    </div>
  </div>
</template>
