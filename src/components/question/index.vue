<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuizStore } from '@/src/lib/store';
import './style.css';

const props = defineProps<{
    question: string;
    options: string[];
    index: number;
    id: number;
}>();

const { $gsap } = useNuxtApp();
const quizStore = useQuizStore();
const { questions } = quizStore;

const selectedAnswer = ref('');
const _wrappers = ref<HTMLElement[]>([]);
const hasMounted = ref(false); // Track if the component has mounted

const confirm = (id: number) => {
    quizStore.saveAnswer(id, selectedAnswer.value);

    if (quizStore.currentIndex === questions.length - 1) {
        quizStore.completeQuiz();
        return;
    }

    const _current = document.querySelectorAll('.q-wrapper')[quizStore.currentIndex];
    const nextIndex = Math.min(quizStore.currentIndex + 1, questions.length - 1);
    const _next = _wrappers.value[nextIndex];

    animate(_current, _next, true);
    quizStore.currentIndex = nextIndex;
};

const selectAnswer = (option: string) => {
    selectedAnswer.value = option === selectedAnswer.value ? '' : option;
};

const back = () => {
    const _current = document.querySelectorAll('.q-wrapper')[quizStore.currentIndex];
    const prevIndex = Math.max(quizStore.currentIndex - 1, 0);
    const _prev = _wrappers.value[prevIndex];

    if (quizStore.currentIndex === prevIndex) return;

    animate(_current, _prev, false);
    quizStore.currentIndex = prevIndex;
};

const animate = (_current: Element, _next: Element, next: boolean) => {
    return new Promise<void>((resolve) => {
        if (!_current || !_next) return;

        $gsap.fromTo(_current, { opacity: 1, scale: 1, zIndex: 1, left: 0 }, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: 'sine.in',
            onComplete: resolve,
        });

        $gsap.fromTo(_next, { opacity: 0, left: next ? '100%' : '-100%', scale: 1, zIndex: 10 }, {
            opacity: 1,
            xPercent: 0,
            left: '0',
            scale: 1,
            delay: 0.25,
            duration: 0.75,
            ease: 'elastic.out(1,0.75)',
        });
    });
};

onMounted(() => {

    _wrappers.value = Array.from(document.querySelectorAll('.q-wrapper')) as HTMLElement[];
    const _current = _wrappers.value[quizStore.currentIndex];
    if (!_current) return;

    //eger store'da selected answer varsa onu set et
    selectedAnswer.value = quizStore.answers[props.id] || '';

    hasMounted.value = true; // Mark as mounted after initialization
});

</script>

<template>
    <div class="q-wrapper" :key="props.id">
        <h2 class="q-title">{{ question }}</h2>
        <div class="q-options">
            <div v-for="(option, index) in options" :key="index" @click.prevent="selectAnswer(option)"
                class="q-option group" :class="[
                    selectedAnswer === option ? 'selected bg-white/20 border border-white hover:border-white' : 'bg-white/5 border-transparent hover:bg-white/20',
                    hasMounted ? 'animate' : ''
                ]">
                <span>{{ option }}</span>
            </div>
        </div>
        <div class="grid grid-cols-2 justify-between gap-2.5 mt-auto shrink-0">
            <div class="button-wrapper">
                <button v-if="index !== 0" @click="back" class="bg-slate-700 hover:bg-slate-600">
                    <svg class="rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    Back
                </button>
            </div>
            <div class="button-wrapper">
                <button @click="confirm(props.id)" :disabled="!selectedAnswer"
                    class="bg-primary-400 hover:bg-primary-600 w-full disabled:opacity-20 disabled:select-none disabled:pointer-events-none"
                    :class="!selectedAnswer ? '' : ''">
                    {{ props.index === questions.length - 1 ? 'Submit' : 'Next' }}
                    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.button-wrapper {
    @apply max-w-full overflow-hidden;

    button {
        @apply w-full text-white rounded-full md:text-lg text-sm md:p-4 p-2.5 inline-flex items-center justify-center gap-2 md:gap-4 transition-all duration-500;
    }
}
</style>