import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import alterdataLogo from '../../assets/alterdata-logo.svg'
import alterstateLogo from '../../assets/alterstate_logo.png'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { logar } from '../../services/ApiUsuario';
import { salvarTokenNaStorage } from '../../utils/Storage';

import '../../styles/login.css'
import loadingImg from '../../assets/loading.gif';

function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState(''); 
  const [carregar, setCarregar] = useState(false);

  const history = useHistory();

  const handleEntrar = (e) => {
    e.preventDefault();
    setCarregar(true);

    logar(username, senha)
      .then((resposta) => {
          const {Authorization, idUsuario} = resposta.data;
          salvarTokenNaStorage(Authorization, idUsuario);                
          setCarregar(false);
          history.push('/home');
      })
      .catch((erro) => {
          alert("Erro! Verifique o console.");
          console.error(erro);
          setCarregar(false);
      });
  }

  return (
    <div className="container">
      <header>
        <img src={alterdataLogo} className="image-Login"/>
      </header>
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
              name="Password"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              onChange={(e) => setSenha(e.target.value)}
            />
          </Paper>

          { carregar ?
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <img src={loadingImg} width={100} alt="loading..." />
            </div>
          :
            <button className="button" onClick = {(e) => handleEntrar(e)} >
              Entrar
            </button>
          }
        </form>
      </div>
    </div>

  );
}

export default Login;
