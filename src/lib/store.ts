import { defineStore } from 'pinia';

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
        answers: {} as Record<string, number>,
    }),
    actions: {
        setQuestions(questions: Array<IQuestion>) {
            this.questions = questions;
        },
        saveAnswer(questionId: string, choiceIndex: number) {
            this.answers[questionId] = choiceIndex;
        },
        resetQuiz() {
            this.currentIndex = 0;
            this.answers = {};
        },
    },
});