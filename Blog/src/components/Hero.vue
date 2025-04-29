<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <section class="bg-gray-900 py-20 mb-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center">
        <div class="sm:px-2 px-1 py-3 rounded-lg">
          <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl typing">
            {{ title }}
          </h1>
        </div>
        <p class="my-4 text-xl text-white underline underline-offset-2">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.typing {
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid white;
  display: inline-block;
}
.typing::after {
  content: '|';
  animation: blink 0.7s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>
