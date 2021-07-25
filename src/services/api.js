import axios from "axios";
import storage from "../storage";

const api = axios.create({
    baseURL: 'https://alterstatus.herokuapp.com'
    // baseURL: 'http://localhost:8080'
})

api.interceptors.request.use((config) => {
    let [token, ] = storage.obterTokenDaStorage();

    if(token) {
        config.headers.Authorization = token; 
    }

    return config;
});

export default api;
