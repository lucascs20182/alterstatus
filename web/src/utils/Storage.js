export function salvarTokenNaStorage(token, idUsuario) {
    localStorage.setItem('token', token)
    localStorage.setItem('idUsuario', idUsuario)
}

export function obterTokenDaStorage() {
    return [
        localStorage.getItem('token'),
        localStorage.getItem('idUsuario'),
    ];
}

export function removerAutenticacao() {
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("nomeUsuario");
}

export function salvarNomeUsuarioNaStorage(nome) {
    localStorage.setItem('nomeUsuario', nome);
}

export function obterNomeUsuarioNaStorage() {
    return localStorage.getItem('nomeUsuario');
}
