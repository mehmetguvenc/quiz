export default defineEventHandler(async (event) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return questions.map((question) => {
        return {
            id: question.id,
            question: question.question,
            options: question.options
        };
    }
    );
})


export const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        id: 3,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        id: 4,
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        answer: "Da Vinci"
    },
    {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        answer: "Au"
    },
    {
        id: 6,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Korea", "Japan", "Vietnam"],
        answer: "Japan"
    },
    {
        id: 7,
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        id: 8,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        answer: "1945"
    },
    {
        id: 9,
        question: "What is the main component of the Sun?",
        options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
        answer: "Hydrogen"
    },
    {
        id: 10,
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: "Nile"
    }
];