<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMobile = ref(false);
const atTop = ref(true)
const open = ref(false) // Missing state for mobile menu

onMounted(() => {
    isMobile.value = window.innerWidth < 768;
    atTop.value = window.scrollY < window.innerHeight / 5;
})

// Separate composable for scroll handling
const useScrollHandler = () => {
    const handleScroll = () => {
        atTop.value = window.scrollY < window.innerHeight / 5;
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })
    return { atTop }
}

const useResizeHandler = () => {
    const handleResize = () => {
        isMobile.value = window.innerWidth < 768;
    }

    onMounted(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize)
    })
    return { isMobile }
}

const { atTop: scrollPosition } = useScrollHandler();
const { isMobile: mobile } = useResizeHandler();

</script>

<template>
    <header class="wrapper header group" :class="!atTop || open ? 'md:mt-2 md:px-2 px-8' : 'md:mt-6 md:px-8'">
        <div class="container" :class="(!atTop || open) && 'bg-white md:bg-white/30 backdrop-blur-2xl px-6'">
            <!-- Logo Section -->
            <div class="logo">
                <router-link :to="'/'"
                    class="font-serif font-bold tracking-tighter uppercase md:text-white text-slate-700"
                    :class="isMobile && atTop && !open ? 'text-white' : 'text-slate-700'"
                    >
                    ✺ Quizzical
                </router-link>
                <button class="relative w-8 h-8 md:hidden focus:outline-none ml-auto" @click="open = !open">
                    <div
                        class="w-full absolute left-1/2 top-1/2 transform  -translate-x-1/2 -translate-y-1/2 text-slate-700"
                        :class="isMobile && atTop && !open ? 'text-white' : 'text-slate-700'">
                        <span aria-hidden="true"
                            class="block absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out"
                            :class="{ 'rotate-45': open, ' -translate-y-2': !open }"></span>
                        <span aria-hidden="true"
                            class="block absolute  h-0.5 w-full bg-current transform transition duration-500 ease-in-out"
                            :class="{ 'opacity-0': open }"></span>
                        <span aria-hidden="true"
                            class="block absolute  h-0.5 w-full bg-current transform  transition duration-500 ease-in-out"
                            :class="{ '-rotate-45': open, ' translate-y-2': !open }"></span>
                    </div>
                </button>
            </div>

            <nav class="nav" :class="(isMobile) ? [open ? 'opacity-100 delay-300 mt-1.5' : 'opacity-0 mt-6'] : ''">
                <router-link v-for="route in [{ path: '/', name: 'Home' }, { path: '/quiz', name: 'Quiz' }]"
                    :key="route.path" :to="route.path"
                    class="md:hover:text-white transition-colors md:text-white/90 text-slate-700" :class="[{ 'underline font-bold': $route.path === route.path }
                    ]">{{ route.name }}
                </router-link>
            </nav>

            <div class="cta">
                <a href="https://www.linkedin.com/in/mehmet-guvenc/" target="_blank"
                    class="px-10 py-3 rounded-full bg-white transition-colors font-serif text-sm text-text">
                    Contact
                </a>
            </div>
        </div>
    </header>
</template>


<style scoped>
.header {
    @apply fixed z-30 w-full py-4 inset-x-0 mx-auto ease-in-out transform transition-all duration-500;

    .container {
        @apply flex flex-col w-full py-4 px-8 rounded-full mx-auto md:items-center md:justify-between md:flex-row transition-all duration-500 max-md:max-w-full;

        .logo {
            @apply flex flex-row items-center justify-between md:w-1/4;
        }

        .nav {
            @apply flex-col flex-grow md:gap-8 gap-4 absolute md:relative max-md:left-0 max-md:top-full rounded-2xl w-full p-4 md:p-0 max-md:bg-white max-md:pb-4 md:pb-0 flex md:flex-row md:justify-center md:w-2/4 transition-all duration-500;
        }

        .cta {
            @apply hidden md:flex md:w-1/4 md:justify-end;
        }
    }
}
</style>
