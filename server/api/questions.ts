export default defineEventHandler((event) => {
    return questions;
})


const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        id: 3,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        id: 4,
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        correctAnswer: "Da Vinci"
    },
    {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correctAnswer: "Au"
    },
    {
        id: 6,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Korea", "Japan", "Vietnam"],
        correctAnswer: "Japan"
    },
    {
        id: 7,
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        id: 8,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945"
    },
    {
        id: 9,
        question: "What is the main component of the Sun?",
        options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
        correctAnswer: "Hydrogen"
    },
    {
        id: 10,
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        correctAnswer: "Nile"
    }
];