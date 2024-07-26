<template>
  <div class="card" style="width: 80%; margin-bottom: 10px">
    <div class="card-header">{{ name }} / {{ title }}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ todoContent }}</li>
      <li class="list-group-item d-flex justify-content-end">
        <button v-if="!isComplete" class="btn btn-outline-primary">完成</button>
        <button class="btn btn-outline-primary" style="margin-left: 5px">編輯</button>
        <button class="btn btn-outline-dark" style="margin-left: 5px">刪除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps(['data']);
const data = props.data;

const name = ref(data.name);
const title = ref(data.title);
const todoContent = ref(data.todoContent);
const isComplete = computed(() => data.isComplete === 'Y');
</script>

<style scoped></style>
