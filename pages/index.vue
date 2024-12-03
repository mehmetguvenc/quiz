<template>
  <Hero />
  <section
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">Welcome to the Quiz App!</h1>
      <p class="text-lg mb-8">Test your knowledge and have fun!</p>
      <!-- <button class="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
        @click="startQuiz">
        Start Quiz
      </button> -->
    </div>
  </section>
</template>

<script setup>

import { onBeforeMount } from 'vue';
import Hero from '@/src/components/hero.vue';

onBeforeMount(() => {
  console.log('Home page mounted');
});

</script>