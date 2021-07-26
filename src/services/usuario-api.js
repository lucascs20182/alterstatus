import api from './api';

function cadastrar(formData) {    
    return new Promise((resolve, reject) => {
        return api.post('/usuario/signup', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

function cadastrarSemFoto(usuario) {    
  return new Promise((resolve, reject) => {
      return api.post('/usuario/signup/nopic', usuario)
          .then(response => resolve(response))
          .catch(error => reject(error))
  });
}

function logar(username, senha) {
    return new Promise((resolve, reject) => {
        return api.post('/login', { username, senha })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

function obterClientes() {
    return new Promise((resolve, reject) => {
        return api.get(`/usuario`)
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

export default {
    cadastrar,
    cadastrarSemFoto,
    logar,
    obterClientes
}
