<script setup>
import { ref, onMounted } from 'vue';
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';

// Typing animation setup
const texts = ['Muhamad', 'Harzarul', 'Afiq'];
const displayedText = ref('');

let index = 0;
let charIndex = 0;
let isDeleting = false;

const typeText = () => {
  const current = texts[index];

  displayedText.value = isDeleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  if (!isDeleting && charIndex === current.length + 1) {
    setTimeout(() => (isDeleting = true), 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
  }

  setTimeout(typeText, isDeleting ? 80 : 120);
};

onMounted(typeText);
</script>

<template>
  <Hero :title="displayedText" subtitle="Where Action Speak Louder Than Word" />
  <HomeCards />
</template>
