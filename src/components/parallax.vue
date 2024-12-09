<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import QuestionSkeleton from './question/skeleton.vue';

const { $gsap, ScrollTrigger } = useNuxtApp();
const container = ref(null)
const questionWrapper = ref(null);
const scrollTriggerInstance = ref(null);

onMounted(() => {
    const wrapper = questionWrapper.value.wrapperRef

    $gsap.set(wrapper, { opacity: 0, y: 150, scale: .75 })
    $gsap.set('.q-option', { opacity: 0, y: 50 })

    const tl = $gsap.timeline({
        scrollTrigger: {
            trigger: container.value,
            start: 'top top',
            scrub: true,
            pin: true,
            markers: false,
            id: 'parallax-animation' // Add ID for tracking
        }
    })

    // Store the ScrollTrigger instance
    scrollTriggerInstance.value = tl.scrollTrigger;

    tl.to(wrapper, { y: 0, opacity: 1, scale: 1 })
        .to('.q-option:nth-child(1)', { opacity: 1, y: 0, duration: 0.5 })
        .to('.q-option:nth-child(2)', { opacity: 1, y: 0, duration: 0.5 })
        .to('.q-option:nth-child(3)', { opacity: 1, y: 0, duration: 0.5 })
        .to('.q-option:nth-child(4)', { opacity: 1, y: 0, duration: 0.5 })
})

onUnmounted(() => {
    if (scrollTriggerInstance.value) {
        scrollTriggerInstance.value.kill();
        scrollTriggerInstance.value = null;
    }
})
</script>

<template>
    <section ref="container" class="w-full h-screen bg-gradient-to-b from-blue-400 to-teal-400 md:px-20 md:py-40 px-8 py-10 pt-20">
        <div class="relative flex h-full flex-col gap-20">
            <div class="max-w-screen-lg mx-auto flex relative w-full h-full">
                <QuestionSkeleton v-bind="$attrs" ref="questionWrapper" />
                <!-- <div class="absolute w-full h-full bg-red-400 rounded-2xl"></div> -->
            </div>
        </div>
    </section>
</template>

<style scoped>
.q-wrapper {
    backdrop-filter: blur(10px);
    transform-style: preserve-3d;
    perspective: 1000px;
}

.q-option {
    transform: translateZ(0);
    will-change: transform;
}
</style>