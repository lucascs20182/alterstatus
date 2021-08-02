import api from './api';

export function obterDadosSquad(idSquad) {
    return new Promise((resolve, reject) => {
        return api.get(`/api/squad/${idSquad}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}
