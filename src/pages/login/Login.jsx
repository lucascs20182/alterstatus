import React, {useState} from 'react';
import alterdataLogo from '../../assets/alterdata-logo.svg'
import alterstateLogo from '../../assets/alterstate_logo.png'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import loadingImg from '../../assets/loading.gif'

import '../../styles/login.css'


function Login() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState(); 

  const [carregar, setCarregar] = useState(false)

  // const handleSubmit = (evento) => {
  //   evento.preventDefault();
  // }


    const fazerLogin = (evento) => {

    evento.preventDefault();
    
    console.log(username,senha)

  };


  return (
    <div className="container">
      <header>
        <img src={alterdataLogo} className="image-Login"/>
      </header>
      <div className="box">
        <img src={alterstateLogo} className="logo-Login" />
        {/* <form className="form" onClick={handleSubmit}> */}
        <form className="form">
          <Paper className="input" ><TextField
            className="field"
            name="Login"
            label="Login"
            variant="outlined"
            size="small"
            onChange={(evento) => setUsername(evento.target.value)}
            

          /></Paper>

          <Paper className="input"><TextField
            className="field"
            id="standard-password-input"
            name="Password"
            label="Password"
            variant="outlined"
            type="password"
            size="small"
            onChange={(evento) => setSenha(evento.target.value)}
          /></Paper>
                        {carregar ?
                <img src={loadingImg} width={100} style={{ alignSelf: 'center' }} alt="loading..." />
                :
                // <button onClick={fazerLogin}>Login</button>

                <button className="button" 
                onClick = {(evento) => fazerLogin(evento)} >
                Entrar
                </button>
            }

        </form>
      </div>
    </div>

  );
}

export default Login;
