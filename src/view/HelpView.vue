<template>
    <h3>不,你不需要帮助!</h3>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    setTimeout(() => {
        router.push('/home');
    }, 1000);
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
