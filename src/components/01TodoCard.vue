<template>
  <div class="card" :class="cardClass" style="margin-bottom: 10px">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div>{{ cardTitle }}</div>
        <div>{{ completeTime }}</div>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ content }}</li>
      <li class="list-group-item d-flex justify-content-end">
        <button
          v-if="!isComplete"
          class="btn btn-outline-primary"
          @click="emits('complete', data.todoId)"
        >
          完成
        </button>
        <button :class="buttonClass" style="margin-left: 5px" @click="emits('update', data)">
          編輯
        </button>
        <button
          class="btn btn-outline-danger"
          style="margin-left: 5px"
          @click="emits('delete', data.todoId)"
        >
          刪除
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['data']);
const emits = defineEmits(['complete', 'update', 'delete']);

//從props取得資料
const data = computed(() => props.data);
const content = computed(() => data.value.todoContent);
//將Y、N計算為boolean
const isComplete = computed(() => data.value.isComplete === 'Y');
//組合todo標題
const cardTitle = computed(() => {
  let icon = isComplete.value ? '✅' : 'ℹ';
  return `${icon} ${data.value.name} / ${data.value.title}`;
});
//設定completeTime
const completeTime = computed(() => {
  if (isComplete.value) {
    //已完成=>切割出日期與時間
    let date = data.value.completeTime.substring(0, 10).replaceAll('-', '/');
    let time = data.value.completeTime.substring(11, 19);
    return `已完成 | ${date} ${time}`;
  }
  //未完成
  return '未完成';
});
//依完成狀態改變樣式
const cardClass = computed(() => {
  return {
    'border-success': isComplete.value,
    'border-primary': !isComplete.value,
    'text-success': isComplete.value,
    'text-primary': !isComplete.value
  };
});
const buttonClass = computed(() => {
  return {
    'btn btn-outline-success': isComplete.value,
    'btn btn-outline-primary': !isComplete.value
  };
});
</script>

<style scoped></style>
