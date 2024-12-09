<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const { $gsap, ScrollTrigger } = useNuxtApp()
const section = ref(null)
const title = ref(null)
const triggers = ref([]) // Store ScrollTrigger instances

const props = defineProps({
    title: {
        type: String,
        default: 'Quizzical'
    },
    subtitle: {
        type: String,
        default: 'Test your knowledge with our interactive quizzes and challenge yourself to learn something new every day.'
    },
    index: {
        type: Number,
        required: true
    }
})

onMounted(() => {
    section.value.querySelectorAll('h1, p, a').forEach((el, index) => {
        const animation = $gsap.from(el, {
            scrollTrigger: {
                trigger: section.value,
                start: 'top center',
                end: 'bottom center',
                toggleActions: 'play none none reverse',
                markers: false,
                id: `hero-animation-${index}` // Add unique ID
            },
            yPercent: 50,
            opacity: 0,
            duration: 2,
            ease: 'elastic',
            delay: index * 0.3,
            onComplete: () => {
                el.style.transform = '';
                el.style.opacity = '';
            }
        })

        // Store the ScrollTrigger instance
        if (animation.scrollTrigger) {
            triggers.value.push(animation.scrollTrigger)
        }
    })
})

onBeforeUnmount(() => {
    // Clean up stored triggers
    triggers.value.forEach(trigger => {
        if (trigger && typeof trigger.kill === 'function') {
            trigger.kill()
        }
    })
    triggers.value = []
})
</script>

<template>
    <section ref="section"
        class="relative min-h-screen flex items-center justify-center bg-gradient-to-t from-blue-400 to-teal-400">
        <div class="container mx-auto px-6 py-16 text-center space-y-8">
            <h1 ref="title" class="font-serif text-6xl md:text-8xl font-bold text-white">
                Quizzical
            </h1>
            <p class="text-2xl md:text-3xl font-extralight tracking-tight text-white/90 max-w-2xl mx-auto">
                Test your knowledge with our interactive quizzes and challenge yourself to learn something new every
                day.
            </p>
            <router-link :to="'/quiz'"
                class="inline-flex font-serif bg-white text-text px-10 py-4 rounded-full font-bold transition-all ease-elastic duration-500 shadow-lg hover:scale-110">
                Start Quiz
            </router-link>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
    </section>
</template>
