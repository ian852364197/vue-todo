<template>
  <h1>Todo List</h1>
  <!-- <table>
    <tr v-for="data in datas" :key="data.todoId">
      <td>{{ data.name }}</td>
      <td>{{ data.title }}</td>
      <td>{{ data.todoContent }}</td>
      <td>{{ data.isComplete }}</td>
      <td>{{ data.addTime }}</td>
      <td>{{ data.completeTime }}</td>
    </tr>
  </table> -->
  <div class="row">
    <div class="col-5"></div>
    <div class="col-7">
      <div class="justify-content-center">
        <TodoCard v-for="data in datas" :key="data.todoId" :data="data"></TodoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosapi from '../../../plugins/axiosapi';
import Swal from 'sweetalert2';
import TodoCard from '@/components/01TodoCard.vue';

Swal.fire({
  text: 'Loading......',
  showConfirmButton: false,
  allowOutsideClick: false
});

const datas = ref();

onMounted(async () => {
  try {
    const response = await axiosapi.get(`Get`);
    datas.value = [...response.data.returnData];
    Swal.close();
  } catch (err) {
    Swal.fire({
      text: `error: ${err.message}`,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認'
    });
  }
});
</script>

<style scoped></style>
