<script setup>
import { useQuizStore } from "@/src/lib/store";
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import Question from '@/src/components/question/index.vue';
import Results from '@/src/components/result.vue';

useHead({
    title: 'Questions | Quizzical',
    meta: [
        {
            name: 'description',
            content: 'A quiz app built with Vue 3 and Vite'
        }
    ]
});

const quizStore = useQuizStore();
const { $axios } = useNuxtApp();
const loading = ref(true);
const initialized = ref(false);

const fetchQuestions = async () => {
    loading.value = true;
    try {
        const { data } = await $axios.get("/questions");
        if (data) {
            quizStore.setQuestions(data);
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
    } finally {
        initialized.value = true;
    }
};

const fetchResult = async () => {
    loading.value = true;
    try {
        const { data, error } = await $axios.post("/results", quizStore.answers);
        if (data) {
            quizStore.setResults(data);
        } else {
            console.error("Error saving response:", error);
        }
    } catch (error) {
        console.error("Error saving response:", error);
    }
};

watch(() => quizStore.completed, async (val) => {
    if (val) {
        await fetchResult().finally(() => {
            loading.value = false;
        });
    }
});



onBeforeMount(async () => {
    await fetchQuestions().finally(() => {
        loading.value = false;
    });
});

</script>

<template>
    <section class="w-wrapper">
        <template v-if="loading">
            <div class="loading-state">
                <div class="spinner-wrapper">
                    <p class="loading-text">
                        Loading
                        <span class="dots">
                            <span class="dot">.</span>
                            <span class="dot">.</span>
                            <span class="dot">.</span>
                        </span>
                    </p>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-if="quizStore.completed" class="inline-flex lg:max-w-screen-lg w-full grow mx-auto">
                <Results :results="quizStore.results" />
            </div>
            <div v-else class="w-full relative">
                <div class="relative lg:max-w-screen-lg w-full grow mx-auto">
                    <Question v-for="(question, index) in quizStore.questions" :key="`question-${question.id}`"
                        :index="index" :id="question.id" :options="question.options" :question="question.question"
                        :class="[
                            index === quizStore.currentIndex
                                ? 'left-0'
                                : 'left-full opacity-0 select-none pointer-events-none'
                        ]" />
                </div>
            </div>
        </template>
    </section>
</template>


<style scoped>
.w-wrapper {
    @apply flex flex-col w-full h-full justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-10 overflow-hidden;

    &>div {
        @apply flex gap-5 w-full pt-20 grow;
    }
}


.loading-state {
    @apply flex items-center justify-center w-full h-full;

    .spinner-wrapper {
        @apply flex flex-col items-center gap-4;

        .loading-text {
            @apply text-white text-4xl font-medium;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .dots {
            @apply inline-flex;
        }

        .dot {
            @apply opacity-0;
            animation: dotFade 1.4s linear infinite;
        }

        .dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
            animation-delay: 0.4s;
        }


    }
}

@keyframes dotFade {

    0%,
    100% {
        opacity: 0;
        transform: translateY(0);
    }

    50% {
        opacity: 1;
        transform: translateY(-4px);
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: .5;
    }
}

.hero-title {
    @apply text-8xl font-black text-white;
}
</style>