<script setup>
import { useQuizStore } from "@/src/lib/store";
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
useHead({
    title: 'Quiz App'
});
const quizStore = useQuizStore();
const { $axios } = useNuxtApp();
const loading = ref(false);

const fetchQuestions = async () => {
    loading.value = true;
    try {
        const { data, error } = await $axios.get("/questions"); // Relative to `baseURL`
        quizStore.setQuestions(data);
        if (!data) {
            console.error("No questions found");
            throw new Error("No questions found");
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    } finally {
        setTimeout(() => {
            loading.value = false;
        }, 1000);
    }
};

onBeforeMount(async () => {
    await fetchQuestions();
});

</script>

<style>
/* LoadedefineNuxtPluginr animation */
</style>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">

        <div v-if="loading">Loading...</div>
        <div v-else>
            <ul>
                <li v-for="(question, index) in quizStore.questions" :key="index" class="text-lg text-black">
                    {{ question.question }}
                </li>
            </ul>
        </div>
    </div>
</template>
