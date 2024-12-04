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
        }, 100);
    }
};


const nextQuestion = () => {
    const _current = document.querySelector(`.question-${quizStore.currentIndex}`);
    const nextIndex = Math.min(quizStore.currentIndex + 1, quizStore.questions.length - 1);
    const _next = document.querySelector(`.question-${nextIndex}`);

    $gsap.to(_current, {
        opacity: 0,
        duration: 1,
        scale: 0.5,
        ease: 'power2.out',
    });

    $gsap.fromTo(_next,
        { opacity: 0, xPercent: 0 },
        {
            xPercent: -100,
            opacity: 1,
            duration: 1,
            ease: 'power2',
            delay: .3,
            onComplete: () => {
                quizStore.currentIndex = nextIndex;
            }
        }
    );

};

const prevQuestion = () => {
    const _current = document.querySelector(`.question-${quizStore.currentIndex}`);
    const prevIndex = Math.max(quizStore.currentIndex - 1, 0);
    const _prev = document.querySelector(`.question-${prevIndex}`);

    $gsap.to(_current,
        {
            xPercent: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2'
        }
    );

    $gsap.fromTo(_prev,
        { opacity: 0, scale: 0.5, },
        {
            opacity: 1,
            duration: 1,
            scale: 1,
            ease: 'power2',
            onComplete: () => {
                quizStore.currentIndex = prevIndex;
            }
        }
    );

    // $gsap.to(_current, {
    //     xPercent: 100,
    //     opacity: 0,
    //     duration: 0.5,
    //     ease: 'power2.inOut',
    //     onComplete: () => {
    //         $gsap.fromTo(_prev,
    //             { xPercent: -100, opacity: 0 },
    //             { xPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.inOut' }
    //         );
    //         quizStore.currentIndex = prevIndex;
    //     }
    // });
};


onBeforeMount(async () => {
    await fetchQuestions();
});

</script>

<style></style>

<template>
    <div class="wrapper">
        <div v-if="loading">Loading...</div>
        <div v-else class="relative">
            <div class="flex relative w-full">
                <Question v-for="(question, index) in quizStore.questions" :key="index" :options="question.options"
                    :question="question.question" :next="() => nextQuestion()" :back="() => prevQuestion()"
                    :class="[`question-${index}`, index !== quizStore.currentIndex && 'translate-x-full opacity-0']" />
            </div>
        </div>
    </div>
</template>


<style scoped>
/* .relative {
    @apply h-full;
}

.question-enter-active,
.question-leave-active {
    @apply absolute w-full;
} */

.wrapper {
    @apply flex flex-col w-full h-full justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-10;

    &>div {
        @apply flex gap-5 w-full pt-20 grow;
    }
}

.hero-title {
    @apply text-8xl font-black text-white;
}
</style>