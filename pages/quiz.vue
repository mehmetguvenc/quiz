<script setup>
import { useQuizStore } from "@/src/lib/store";
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import Question from '@/src/components/question.vue'

const { $gsap } = useNuxtApp();

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

onMounted(() => {
    $gsap.set('.hero-title', { opacity: 0, y: '-200%' });
    $gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo',
        // onComplete: () => {
        //     $gsap.to('.hero-title', {
        //         opacity: 0,
        //         duration: 1,
        //         delay: 1,
        //         ease: 'sine.inOut',
        //     });
        // }
    });
});

</script>

<style>
/* LoadedefineNuxtPluginr animation */
</style>

<template>
    <div class="w-screen h-screen flex items-center justify-center bg-gradient-to-t from-slate-500 to-lime-500">
        <h1 class="text-8xl font-black hero-title">Animated Title</h1>
    </div>

    <!-- <div
        class="w-full h-full flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

        <div v-if="loading">Loading...</div>
        <div v-else>
            <Question v-for="(question, index) in quizStore.questions" :key="index" class="text-lg text-black"
                :options="question.options" :question="question.question" />
        </div>
    </div> -->
</template>
