import axios from 'axios';

export const API = axios.create({
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://192.168.1.108:3000'
  //     : 'https://api.jarchiwum.pl',
  baseURL: 'http://localhost:3000',
});
