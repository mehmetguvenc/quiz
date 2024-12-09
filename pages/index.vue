<template>
  <Hero :index="0" title="Welcome to Quizzical" subtitle="Start your journey of knowledge" />
  <Parallax />
</template>

<script setup>

import { onBeforeMount } from 'vue';
import Hero from '@/src/components/hero.vue';
import Parallax from '@/src/components/parallax.vue';

useHead({
  title: 'Quizzical',
  meta: [
    {
      name: 'description',
      content: 'A quiz app built with Vue 3 and Vite'
    }
  ]
});

onBeforeMount(() => {
});

</script>