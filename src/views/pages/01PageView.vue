<template>
  <h1 style="margin-bottom: 10px">Todo List</h1>
  <div class="row">
    <div class="col-5">
      <form>
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
        <button type="button" class="btn btn-primary" @click="saveTodo">儲存</button>
      </form>
    </div>
    <div class="col-7">
      <div class="justify-content-center">
        <TodoCard
          v-for="data in datas"
          :key="data.todoId"
          :data="data"
          @complete="completeTodo"
          @update="updateTodo"
          @delete="deleteTodo"
        ></TodoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosapi from '../../../plugins/axiosapi';
import Swal from 'sweetalert2';
import TodoCard from '@/components/01TodoCard.vue';

//顯示loading直到取得資料
Swal.fire({
  text: 'Loading......',
  showConfirmButton: false,
  allowOutsideClick: false
});

const datas = ref();

//輸入欄位
const name = ref('');
const title = ref('');
const todoContent = ref('');
//修改用
let updateFlag = false;
let todoId = '';

//刷新datas的資料
const refreshData = async () => {
  const response = await axiosapi.get(`Get`);
  datas.value = [...response.data.returnData].sort((a, b) => {
    let aTime = new Date(a.addTime);
    let bTime = new Date(b.addTime);
    return bTime - aTime;
  });
  name.value = '';
  title.value = '';
  todoContent.value = '';
  updateFlag = false;
};

//儲存todo
const saveTodo = async () => {
  //共通的Request body
  const req = {
    name: name.value,
    title: title.value,
    todoContent: todoContent.value
  };
  if (!updateFlag) {
    //新增
    await axiosapi.post('InsertTodo', req);
  } else {
    //修改，Request body需要todoId
    req.todoId = todoId;
    await axiosapi.put(`UpdateTodoContent/${todoId}`, req);
  }
  refreshData();
};

//修改todo為完成
const completeTodo = async (id) => {
  let req = {
    todoId: id,
    isComplete: 'Y'
  };
  await axiosapi.put(`UpdateTodoStatus/${id}`, req);
  refreshData();
};

//將todoCard中要更新的資料填入表單
const updateTodo = (data) => {
  name.value = data.name;
  title.value = data.title;
  todoContent.value = data.todoContent;
  //設定狀態為修改並記錄todoId
  todoId = data.todoId;
  updateFlag = true;
};

//刪除todo
const deleteTodo = async (id) => {
  await axiosapi.delete(`Delete/${id}`);
  refreshData();
};

onMounted(async () => {
  refreshData();
  Swal.close();
});
</script>

<style scoped></style>
