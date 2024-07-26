<template>
  <div class="card" style="width: 80%; margin-bottom: 10px">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div>{{ name }} / {{ title }}</div>
        <div>{{ completeTime }}</div>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ content }}</li>
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
const content = ref(data.todoContent);
const isComplete = computed(() => data.isComplete === 'Y');
const completeTime = computed(() => {
  if (isComplete.value) {
    let date = data.completeTime.substring(0, 10).replaceAll('-', '/');
    let time = data.completeTime.substring(11, 19);
    return `已完成 | ${date} ${time}`;
  }
  return '未完成';
});
</script>

<style scoped></style>
