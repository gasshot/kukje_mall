import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 데이터 구조를 단순화하는 인터셉터
http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API 에러:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default http;