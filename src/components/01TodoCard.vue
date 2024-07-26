<template>
  <div class="card" :class="cardClass" style="width: 80%; margin-bottom: 10px">
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
import { computed, ref } from 'vue';

const props = defineProps(['data']);
const emits = defineEmits(['complete', 'update', 'delete']);

//從props取得資料
const data = props.data;
const name = ref(data.name);
const title = ref(data.title);
const content = ref(data.todoContent);
//將Y、N計算為boolean
const isComplete = computed(() => data.isComplete === 'Y');
const cardTitle = computed(() => {
  let icon = isComplete.value ? '✅' : 'ℹ';
  return icon + ' ' + name.value + '/ ' + title.value;
});
//設定completeTime
const completeTime = computed(() => {
  if (isComplete.value) {
    //已完成=>切割出日期與時間
    let date = data.completeTime.substring(0, 10).replaceAll('-', '/');
    let time = data.completeTime.substring(11, 19);
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
