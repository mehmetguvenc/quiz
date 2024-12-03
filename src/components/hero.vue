<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Component logic can be added here
</script>

<template>
    <div
        class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400">
        <div class="container mx-auto px-6 py-16 text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                Quizzical
            </h1>
            <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Test your knowledge with our interactive quizzes and challenge yourself to learn something new every
                day.
            </p>
            <router-link :to="'/quiz'"
                class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg">
                Start Quiz
            </router-link>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
    </div>
</template>
