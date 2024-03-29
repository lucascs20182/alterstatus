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
    localStorage.removeItem("idSquadAtiva");
}

export function salvarSquadAtivaNaStorage(idSquad) {
    localStorage.setItem('idSquadAtiva', idSquad);
}

export function obterSquadAtivaDaStorage() {
    return localStorage.getItem('idSquadAtiva');
}

export function mudarNomeDoSquad() {
    return localStorage.getItem('idSquadAtiva')
}
