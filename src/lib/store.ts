import { defineStore } from 'pinia';
import type { QuizResult } from '@/server/api/results';

export interface IQuestion {
    id: number;
    question: string;
    options: string[];
    answer: string;
}


export const useQuizStore = defineStore('quiz', {
    state: () => ({
        questions: [] as Array<IQuestion>,
        currentIndex: 0,
        answers: {} as Record<number, string>,
        completed: false,
        results: null as QuizResult | null,
    }),
    actions: {
        completeQuiz() {
            this.completed = true;
        },
        setQuestions(questions: Array<IQuestion>) {
            this.questions = questions;
        },
        saveAnswer(questionId: number, answer: string) {
            this.answers[questionId] = answer;
        },
        setResults(results: QuizResult) {
            this.results = results;
        },
        resetQuiz() {
            this.completed = false;
            this.currentIndex = 0;
            this.answers = {};
        },
    }
});