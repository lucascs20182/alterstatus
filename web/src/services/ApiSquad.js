import api from './api';

export function obterSquads() {
    return new Promise((resolve, reject) => {
        return api.get('/api/squad')
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function criarSquad(nomeSquad) {
    return new Promise((resolve, reject) => {
        return api.post('/api/squad', { 'nome': nomeSquad })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function obterDadosSquad(idSquad) {
    return new Promise((resolve, reject) => {
        return api.get(`/api/squad/${idSquad}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function editarNomeDeSquad(idSquad, nome) {
    const body ={
        "id_squad": idSquad,
        "nome": nome,
    }
    return new Promise((resolve, reject) => {
        return api.put(`/api/squad/`, body)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

export function removerSquad(idSquad) {  
    const body ={
        "id_squad": idSquad
    }

    return new Promise((resolve, reject) => {
        return api.delete(`/api/squad`, body)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}
