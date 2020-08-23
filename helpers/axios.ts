import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://192.168.1.108:3000'
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:3000'
  //     : 'https://api.jarchiwum.pl',
});
