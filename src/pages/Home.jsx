import { useState } from "react";

import usuarioService from '../services/usuario-api'

import './anyStyle.css';

const Home = () => {
    const [imagem, setImagem] = useState(null);
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [status, setStatus] = useState('');

    // const cadastrarUsuarioComFoto = () => {

    // }

    // const cadastrarUsuarioSemFoto = () => {
        
    // }

    const cadastrarUsuario = (e) => {
        e.preventDefault();

        const usuario = {}

        if(username != "") {
            usuario.username = username;
        }

        if(senha != "") {
            usuario.senha = senha;
        }

        if(nome != "") {
            usuario.nome = nome;
        }

        if(status != "") {
            usuario.status = status;
        }

        if(imagem == null) {
            console.log('usuario' + usuario);

            usuarioService.cadastrarSemFoto(usuario)
                .then((resposta) => {
                    console.log(resposta);
                    alert("Usuário cadastrado!");
                    
                    window.open("/login", "_self");
                })
                .catch((erro) => {
                    alert("Erro! Verifique o console.");
                    console.error(erro);

                    return;
                });
        } else {
            const usuarioJSON = JSON.stringify(usuario);
            const formData = new FormData();

            const blob = new Blob([usuarioJSON], {
                type: 'application/json'
            })

            formData.append('file', imagem);
            formData.append('usuario', blob);

            console.log('usuarioJSON' + usuarioJSON);

            usuarioService.cadastrar(formData)
                .then((resposta) => {
                    console.log(resposta);
                    alert("Usuário cadastrado!");
                    window.open("/login", "_self");
                })
                .catch((erro) => {
                    alert("Erro! Verifique o console.");
                    console.error(erro);
                });
        }
    };
    
    return (
        <form>

            <div>
                <label htmlFor="file">Attach an image</label>
                <input
                    id="file"
                    type="file"
                    onChange={(e) => setImagem(e.target.files[0])}
                />                
            </div>

            <div>
                <label htmlFor="nome">Nome: </label>
                <input
                    id="nome"
                    placeholder="Lucas Cruz"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="username">Username: </label>
                <input
                    id="username"
                    placeholder="lucas"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="senha">Senha: </label>
                <input
                    id="senha"
                    placeholder="******"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="status">Status: </label>
                <input
                    id="status"
                    placeholder="ex.: Almoçando"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
            </div>

            <button onClick={cadastrarUsuario}>Criar usuário</button>
        </form>
    );
};

export default Home;
