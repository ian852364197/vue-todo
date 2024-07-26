<template>
  <h1 style="margin-bottom: 10px">Todo List</h1>
  <div class="row">
    <div class="col-5">
      <form @submit="postTodo">
        <div class="mb-3">
          <h2>請填寫代辦事項</h2>
          <label for="inputName" class="form-label">姓名</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            name="name"
            v-model="name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="inputTitle" class="form-label">代辦標題</label>
          <input
            type="text"
            class="form-control"
            id="inputTitle"
            name="title"
            v-model="title"
            required
          />
        </div>
        <div class="mb-3">
          <label for="inputText" class="form-label" name="todoContent">代辦內容</label>
          <textarea
            class="form-control"
            id="inputText"
            style="height: 100px; resize: none"
            v-model="todoContent"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">儲存</button>
      </form>
    </div>
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

const name = ref('');
const title = ref('');
const todoContent = ref('');

const postTodo = async () => {
  const req = {
    name: name.value,
    title: title.value,
    todoContent: todoContent.value
  };
  await axiosapi.post('InsertTodo', req);
};

onMounted(async () => {
  const response = await axiosapi.get(`Get`);
  datas.value = [...response.data.returnData];
  Swal.close();
});
</script>

<style scoped></style>
