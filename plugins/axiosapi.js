import axios from 'axios';
import Swal from 'sweetalert2';

//環境變數取得URL
const axiosapi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

//處理錯誤訊息
const handleErrorCode = (resData) => {
  Swal.fire({
    text: `錯誤: ${resData.returnMessage}`,
    icon: 'error',
    allowOutsideClick: false,
    confirmButtonText: '確認'
  });
};

//攔截response的error
axiosapi.interceptors.response.use(
  (response) => {
    if (response.data.returnCode == '2000') {
      return response;
    }
    //returnCode不是2000時處理錯誤訊息
    handleErrorCode(response.data);
  },
  (error) => {
    Swal.fire({
      text: `預期外的錯誤: ${error.message}`,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認'
    });
  }
);

export default axiosapi;
