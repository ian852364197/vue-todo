import axios from 'axios';
import Swal from 'sweetalert2';

//環境變數取得URL
const axiosapi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

//攔截response的error
axiosapi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Swal.fire({
      text: `error: ${error.message}`,
      icon: 'error',
      allowOutsideClick: false,
      confirmButtonText: '確認'
    });
  }
);

export default axiosapi;
