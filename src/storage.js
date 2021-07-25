function salvarTokenNaStorage(token, idUsuario){
    localStorage.setItem('token', token)
    localStorage.setItem('idUsuario', idUsuario)
}

function obterTokenDaStorage(){
    return [
        localStorage.getItem('token'),
        localStorage.getItem('idUsuario'),
    ];
}

function removerAutenticacao(){
    localStorage.removeItem("token");
    localStorage.removeItem("idUsuario");
}

export default {
    salvarTokenNaStorage,
    obterTokenDaStorage,
    removerAutenticacao,
}
