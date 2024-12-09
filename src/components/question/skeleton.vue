<script setup>
import './style.css';
import { ref } from 'vue'

const wrapperRef = ref(null)

defineOptions({
    inheritAttrs: false
})

defineExpose({
    wrapperRef
})
</script>

<template>
    <div ref="wrapperRef" class="q-wrapper relative min-h-96">
        <h2 class="q-title">This is an Example Question</h2>
        <div class="q-options">
            <div v-for="(option, index) in ['Option A', 'Option B', 'Option C', 'Option D']" :key="index"
                class="q-option group" style="transition: none;">
                <span>{{ option }}</span>
            </div>
        </div>
    </div>
</template>