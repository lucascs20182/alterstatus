import axios from 'axios';

const api = axios.create({
  'baseUrl': 'https://alterstatus.herokuapp.com/'
});

export default api;