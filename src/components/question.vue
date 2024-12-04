<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuizStore } from '@/src/lib/store';

const props = defineProps<{
    question: string
    options: string[],
    back: () => void,
    next: () => void
}>(); // Define props


const { $gsap } = useNuxtApp();
const { currentIndex, questions, setQuestions } = useQuizStore();
const selectedAnswer = ref('');

const confirmAnswer = () => {
    // if (!selectedAnswer.value) {
    //     alert('Please select an answer');
    //     return;
    // }
    props.next();
};

const selectAnswer = (option: string) => {
    option === selectedAnswer.value ? selectedAnswer.value = '' : selectedAnswer.value = option;
};

const back = () => {
    props.back();
};

</script>



<template>
    <div :class="`q-wrapper`">
        <!-- Question Section -->
        <h2 class="q-title">
            {{ question }}
        </h2>

        <!-- Options Section -->
        <div class="q-options">
            <div v-for="(option, index) in options" :key="index" @click.prevent="selectAnswer(option)"
                class="q-option group"
                :class="selectedAnswer === option ? 'bg-white/20 border border-white hover:border-white' : 'bg-white/5 border-transparent hover:bg-white/20'">
                <span>{{ option }}</span>
            </div>
        </div>

        <!-- Button Section -->
        <div class="flex justify-between space-x-4 mt-auto shrink-0">
            <button @click="back"
                class="px-6 py-3 rounded-lg border border-slate-500 bg-white/10 hover:bg-white/20 text-white font-light transition-all">
                Back
            </button>
            <button @click="confirmAnswer" :disabled="false"
                class="px-6 py-3 rounded-lg bg-slate-900/50 backdrop-blur-xl text-white font-light transition-all duration-500"
                :class="!selectedAnswer ? 'opacity-50' : ''">
                {{ currentIndex === questions.length - 1 ? 'Submit' : 'Next' }}
            </button>
        </div>

    </div>
</template>


<style scoped>
.q-wrapper {
    @apply absolute h-full flex flex-col lg:gap-10 gap-5 w-full grow bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 p-10 shrink-0;

    .q-title {
        @apply w-full text-center text-5xl font-serif font-bold text-slate-700 tracking-tight shrink-0;
    }

    .q-options {
        @apply grid grid-cols-1 grow gap-3;

        .q-option {
            @apply relative flex items-center text-center bg-white/70 p-4 rounded-xl transition-all duration-500 cursor-pointer border shadow-sm;

            span {
                @apply w-full text-2xl font-sans font-light tracking-tight text-slate-700 transition duration-300;
            }

        }
    }
}
</style>