import api from './api';

export function cadastrarCargo(nomeCargo, idSquad) {
    const body = {
        "nome": nomeCargo,
        "id_squad": idSquad
    }

    return new Promise((resolve, reject) => {
        return api.post('/api/cargo', body)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}
