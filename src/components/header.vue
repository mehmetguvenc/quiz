<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const atTop = ref(true)
const open = ref(false) // Missing state for mobile menu

onMounted(() => {
    atTop.value = window.pageYOffset < 50
})

// Separate composable for scroll handling
const useScrollHandler = () => {
    const handleScroll = () => {
        atTop.value = window.pageYOffset < 50
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return { atTop }
}

const { atTop: scrollPosition } = useScrollHandler()

// Computed classes for better organization
const navClasses = computed(() => ({
    'bg-white/30 backdrop-blur-xl max-w-screen-xl': !scrollPosition.value,
    'max-w-screen-2xl': scrollPosition.value
}))

const linkClasses = computed(() => ({
    'text-white': scrollPosition.value,
    'text-black': !scrollPosition.value
}))
</script>

<template>
    <header
        class="fixed z-50 w-full px-8 py-4 transition-all duration-500 rounded-full mt-4 inset-x-0 mx-auto ease-in-out transform"
        :class="navClasses">
        <div class="flex flex-col w-full p-2 mx-auto md:items-center md:justify-between md:flex-row">
            <!-- Logo Section -->
            <div class="flex flex-row items-center justify-between md:w-1/4">
                <router-link :to="'/'" class="font-bold tracking-tighter uppercase" :class="linkClasses">
                    ✺ Quizzical
                </router-link>
                <button class="md:hidden focus:outline-none" @click="open = !open">
                    <!-- SVG Burger goes here -->
                </button>
            </div>

            <!-- Navigation Links - Centered -->
            <nav class="flex-col flex-grow gap-8 hidden pb-4 md:pb-0 md:flex md:flex-row md:justify-center md:w-2/4">
                <router-link v-for="route in [{ path: '/', name: 'Home' }, { path: '/quiz', name: 'Quiz' }]"
                    :key="route.path" :to="route.path" class="hover:text-gray-900 transition-colors" :class="[
                        linkClasses,
                        { 'text-gray-900 font-semibold': $route.path === route.path }
                    ]">{{ route.name }}
                </router-link>
            </nav>

            <!-- Sign In Button - Right -->
            <div class="hidden md:flex md:w-1/4 md:justify-end">
                <button class="px-8 py-2.5 rounded-full transition-colors text-sm"
                    :class="atTop ? 'bg-white text-black' : 'bg-black/50 text-white backdrop-blur-sm'">
                    Login
                </button>
            </div>
        </div>
    </header>
</template>
