import { questions } from "./questions";
import { IQuestion } from '@/src/lib/store';

interface QuizResponse {
    [key: number]: string;
}

export interface QuizResult {
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: {
        questionId: number;
        correct: boolean;
        userAnswer: string;
        correctAnswer: string;
    }[];
}

export default defineEventHandler(async (event) => {
    try {
        // Get answers from request body
        const userAnswers: QuizResponse = await readBody(event);

        if (!userAnswers || Object.keys(userAnswers).length === 0) {
            throw createError({
                statusCode: 400,
                message: 'No answers provided'
            });
        }

        // Validate answers and calculate score
        const results: QuizResult = {
            score: 0,
            totalQuestions: questions.length,
            percentage: 0,
            answers: []
        };

        // Check each answer
        questions.forEach(question => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.answer;

            if (isCorrect) {
                results.score++;
            }

            results.answers.push({
                questionId: question.id,
                correct: isCorrect,
                userAnswer: userAnswer || '',
                correctAnswer: question.answer
            });
        });

        // Calculate percentage
        results.percentage = (results.score / results.totalQuestions) * 100;

        // Delay response by 1000ms
        await new Promise(resolve => setTimeout(resolve, 1000));
        return results;

    } catch (error) {
        console.error('Error processing results:', error);
        throw createError({
            statusCode: 500,
            message: 'Error processing quiz results'
        });
    }
});