<script setup>
import Card from './Card.vue';
import { RouterLink } from 'vue-router';

const cards = [
  {
    title: 'For Viewers',
    text: 'Browse our Vue Jobs and Start Your Career Today',
    link: '/blog',
    button: 'Browse Blog',
    bg: ''
  },
  {
    title: 'For Subscribers',
    text: 'Browse our Vue Jobs and Start Your Career Today',
    link: '/signup',
    button: 'Sign Up',
    bg: 'bg-gray-200'
  },
  {
    title: 'For Fans',
    text: 'Browse our Vue Jobs and Start Your Career Today',
    link: '/contact',
    button: 'Contact',
    bg: ''
  }
];
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card
          v-for="(card, index) in cards"
          :key="index"
          :bg="card.bg"
        >
          <h2 class="text-2xl font-bold">{{ card.title }}</h2>
          <p class="mt-2 mb-4">{{ card.text }}</p>
          <RouterLink
            :to="card.link"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-yellow-400"
          >
            {{ card.button }}
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
