<script setup lang="ts">
import { useQuizStore } from '@/src/lib/store';
import type { QuizResult } from '@/server/api/results';
import { ref, onMounted } from 'vue';

const props = defineProps<{
    results: QuizResult | null;
}>();

const { $gsap } = useNuxtApp();
const quizStore = useQuizStore();
const wrapper = ref<HTMLElement | null>(null);
const answers = ref<HTMLElement[]>([]);

onMounted(() => {
    if (!wrapper.value) return;

    const tl = $gsap.timeline({
        defaults: {
            duration: 0.75,
            ease: 'power3.out'
        }
    });

    // Animate wrapper
    tl.from(wrapper.value, {
        y: 50,
        opacity: 0,
    });

    // Animate circular chart
    tl.from('.circular-chart', {
        scale: 0,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        duration: 1
    });

    // Animate score
    tl.from('.my-score', {
        x: -50,
        opacity: 0,
        duration: 0.5
    });

    // Animate answer items
    tl.from('.answer-item', {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    });
});

const retakeQuiz = () => {
    quizStore.resetQuiz();
};
</script>

<template>
    <div class="results-wrapper" ref="wrapper">
        <div v-if="results" class="score-card">
            <svg viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="circle" :stroke-dasharray="`${results.percentage}, 100`" d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text x="18" y="20.35" class="percentage">{{ results.percentage.toFixed(0) }}%</text>
            </svg>

            <div class="mt-8 space-y-4">
                <p class="text-2xl text-center text-white my-score">
                    Score: {{ results.score }} / {{ results.totalQuestions }}
                </p>
                <div class="answers-breakdown">
                    <div v-for="answer in results.answers" :key="answer.questionId" class="answer-item"
                        :class="answer.correct ? 'bg-green-600/90' : 'bg-red-400/90'">
                        <span>Question {{ answer.questionId }}</span>
                        <span>{{ answer.correct ? '✓' : '✗' }}</span>
                    </div>

                </div>
            </div>
        </div>

        <button @click="retakeQuiz"
        class="inline-flex font-serif bg-white text-text px-10 py-4 mt-10 rounded-full font-bold transition-all ease-elastic duration-500 shadow-lg hover:scale-110">
            Retake Quiz
        </button>
    </div>
</template>

<style scoped>
.results-wrapper {
    @apply flex flex-col items-center w-full md:p-8;
}

.score-card {
    @apply bg-white/30 rounded-2xl p-10 backdrop-blur-xl w-full md:max-w-screen-md;
}

.circular-chart {
    @apply w-48 h-48 mx-auto;
}

.circle-bg {
    fill: none;
    stroke: rgba(255, 255, 255, 0.1);
    stroke-width: 2.8;
}

.circle {
    fill: none;
    stroke: #fff;
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
}

.percentage {
    fill: #fff;
    font-size: 0.5em;
    text-anchor: middle;
    font-weight: bold;
}

.answers-breakdown {
    @apply mt-6 space-y-2;
}

.answer-item {
    @apply flex justify-between items-center p-3 rounded-lg text-white;
}

@keyframes progress {
    0% {
        stroke-dasharray: 0 100;
    }
}
</style>