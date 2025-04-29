<script setup>
import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  blog: Object
});

const showFullContent = ref(false);

const toggleFullDescription = () => {
  showFullContent.value = !showFullContent.value;
};

const truncatedDescription = computed(() => {
  const content = props.blog.content || '';
  return showFullContent.value ? content : content.slice(0, 90) + '...';
});
</script>

<template>
  <div class="pt-16">
    <div class="bg-white rounded-xl shadow-md relative p-4">
      <div class="mb-6">
        <h3 class="text-xl font-bold">
          {{ blog.title }}
        </h3>
        <div class="text-gray-600 my-2 text-sm">
          {{ blog.subtitle }}
        </div>

        <div class="mb-2">
          <p>{{ truncatedDescription }}</p>
          <button
            @click="toggleFullDescription"
            class="text-green-500 hover:text-green-600 mb-5"
          >
            {{ showFullContent ? 'Less' : 'More' }}
          </button>
        </div>

        <div class="border border-gray-100 mb-5" />

        <div class="flex flex-col lg:flex-row justify-between mb-4">
          <h3 class="font-bold uppercase">
            {{ blog.author.name }}
          </h3>
          <h3>{{ blog.author.contactEmail }}</h3>
        </div>

        <div class="flex flex-col md:flex-row justify-between mb-1">
          <h4 class="text-xs italic">{{ blog.date }}</h4>
          <RouterLink
            :to="`/blogs/${blog.id}`"
            class="h-[36px] bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Read More
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
