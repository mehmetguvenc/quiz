import { defineStore } from 'pinia';

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    answer: string;
}

export const useQuizStore = defineStore('quiz', {
    state: () => ({
        questions: [] as Array<QuizQuestion>,
        currentIndex: 0,
        answers: {} as Record<string, number>,
    }),
    actions: {
        setQuestions(questions: Array<QuizQuestion>) {
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