import { useState } from "react";

import usuarioService from '../services/usuario-api';
import storage from '../storage';

import loadingImg from '../assets/loading.gif';

import './anyStyle.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');

    const [loading, setLoading] = useState(false);

    const fazerLogin = () => {
        setLoading(true);

        usuarioService.logar(username, senha)
            .then((resposta) => {
                const {Authorization, idUsuario} = resposta.data;
                storage.salvarTokenNaStorage(Authorization, idUsuario);                
                setLoading(false);
                window.open("/home", "_self");
            })
            .catch((erro) => {
                alert("Erro! Verifique o console.");
                console.error(erro);
                setLoading(false);
            });
    }

    return (
        <form>
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

            {loading ?
                <img src={loadingImg} width={100} style={{ alignSelf: 'center' }} alt="loading..." />
                :
                <button onClick={fazerLogin}>Login</button>
            }
        </form>
    );
};

export default Login;
