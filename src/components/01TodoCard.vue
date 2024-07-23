<template>
  <div class="card" style="width: 18rem">
    <div class="card-header">{{ name }} / {{ title }}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"></li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['data']);

const name = ref(props.data.name);
const title = ref(props.data.title);
</script>

<style scoped></style>
