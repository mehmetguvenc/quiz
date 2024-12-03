<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
    question: string
    options: string[]
}>()

const selectedAnswer = ref('');

const confirmAnswer = () => {
    console.log('Selected Answer:', selectedAnswer.value);
}

</script>



<template>
    <div class="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <!-- Question Section -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-white leading-tight">
                {{ question }}
            </h2>
        </div>

        <!-- Options Section -->
        <div class="space-y-4 mb-8">
            <label v-for="(option, index) in options" :key="index"
                class="flex items-center p-4 rounded-lg bg-white/5 hover:bg-white/20 transition-all cursor-pointer group">
                <input type="radio" :name="'question'" :value="option" v-model="selectedAnswer"
                    class="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300">
                <span class="ml-3 text-white group-hover:text-white/90">{{ option }}</span>
            </label>
        </div>

        <!-- Button Section -->
        <div class="flex justify-between space-x-4">
            <button class="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all">
                Back
            </button>
            <button
                @click="confirmAnswer"
                class="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all">
                Confirm
            </button>
        </div>
    </div>
</template>
