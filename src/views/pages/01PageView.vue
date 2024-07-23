<template>
  <h1>Hi</h1>
  <p>{{ test }}</p>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosapi from '../../../plugins/axiosapi';

const test = ref();
onMounted(async () => {
  test.value = await axiosapi.get(`Get`);
});
</script>

<style scoped></style>
