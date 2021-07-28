import api from './api';

export function logar(username, senha) {
    return new Promise((resolve, reject) => {
        return api.post('/login', { username, senha })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function obterDadosUsuario(id) {
    return new Promise((resolve, reject) => {
        return api.get(`/usuario/${id}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}
