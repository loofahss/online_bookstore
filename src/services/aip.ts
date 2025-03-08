import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // 后端 API 地址
});

export const fetchBooks = async () => {
    return api.get('/books');
};

export const addBook = async (data: any) => {
    return api.post('/books', data);
};
