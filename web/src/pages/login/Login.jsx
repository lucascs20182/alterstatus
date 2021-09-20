import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logar } from '../../services/ApiUsuario';
import { salvarTokenNaStorage } from '../../utils/Storage';
import alterdataLogo from '../../assets/alterdata-logo.svg'
import alterstateLogo from '../../assets/alterstate_logo.png'
import '../../styles/login.css'
import AlertaError from '../../components/Alert/AlertErrorLogar'

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [carregar, setCarregar] = useState(false);
  const [erro, setErro] = useState(false);

  const history = useHistory();

  const handleEntrar = (e) => {
    e.preventDefault();
    setCarregar(true);
    setErro(false);

    logar(username, senha)
      .then((resposta) => {
        const { Authorization, idUsuario } = resposta.data;
        salvarTokenNaStorage(Authorization, idUsuario);
        setCarregar(false);
        history.push('/home');
      })
      .catch((erro) => {
        console.error(erro);
        setCarregar(false);
        setErro(true);
      });
  }

  return (
    <div className="container">
      <div className="box">
        <img src={alterstateLogo} className="logo-Login" />

        <form className="form">
          <Paper className="input">
            <TextField
              className="field"
              name="Login"
              label="Login"
              variant="outlined"
              size="small"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Paper>

          <Paper className="input">
            <TextField
              className="field"
              id="standard-password-input"
              name="Senha"
              label="Senha"
              variant="outlined"
              type="password"
              size="small"
              onChange={(e) => setSenha(e.target.value)}
            />
          </Paper>

          {carregar ?
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
            :
            <button className="button" onClick={(e) => handleEntrar(e)} >
              Entrar
            </button>
          }
        </form>
      </div>
      {erro ?
        <div>
          <AlertaError />
        </div>

        :

        ''
      }
    </div>

  );
}

export default Login;
