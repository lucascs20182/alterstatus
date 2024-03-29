import api from './Api';

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

export function cadastrar(formData) {    
    return new Promise((resolve, reject) => {
        return api.post('/usuario', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function editar(formData) {    
    return new Promise((resolve, reject) => {
        return api.put('/usuario', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function mudarUsuarioDeSquad(idUsuario, idSquad) {   
    const body = {
        "id_usuario": idUsuario,
        "id_squad": idSquad
    }
    
    return new Promise((resolve, reject) => {
        return api.post('/usuario/squad', body)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function mudarCargoDoUsuario(idUsuario, idCargo) {   
    const body = {
        "id_usuario": idUsuario,
        "id_cargo": idCargo
    }
    
    return new Promise((resolve, reject) => {
        return api.put('/usuario/cargo', body)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function removerCargo(idUsuario) {
    return new Promise((resolve, reject) => {
        return api.delete(`/usuario/cargo/${idUsuario}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export function removerUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
        return api.delete(`/usuario/${idUsuario}`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });

   }

export function editarStatus(status,idUsuario) {    
    return new Promise((resolve, reject) => {
        return api.patch(`/usuario/${idUsuario}`, {status}, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });

}
