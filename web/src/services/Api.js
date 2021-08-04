import axios from 'axios';
import { obterTokenDaStorage } from '../utils/Storage';

const api = axios.create({
//  baseURL: 'https://alterstatus.herokuapp.com'
  baseURL: 'http://localhost:8080'
})

api.interceptors.request.use((config) => {
  let [token, ] = obterTokenDaStorage();

  if(token) {
      config.headers.Authorization = token; 
  }

  return config;
});

export default api;
