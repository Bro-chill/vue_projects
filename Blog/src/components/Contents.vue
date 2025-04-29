<script setup>
import { reactive, defineProps, onMounted } from 'vue';
import axios from 'axios';

import ContentCard from './ContentCard.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

// Props definition
const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
});

// Reactive state
const state = reactive({
  blogs: [],
  isLoading: true
});

// Fetch blogs on component mount
onMounted(async () => {
  try {
    const response = await axios.get('/api/blogs');
    state.blogs = response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <!-- Loading State -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Blog List -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ContentCard
          v-for="blog in state.blogs.slice(0, props.limit || state.blogs.length)"
          :key="blog.id"
          :blog="blog"
        />
      </div>
    </div>
  </section>
</template>
