import React from 'react';
import alterdataLogo from '../../assets/alterdata-logo.svg'
import alterstateLogo from '../../assets/alterstate_logo.png'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import '../../styles/login.css'


function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    <Alert severity="success">
    <AlertTitle>Success</AlertTitle>
      This is a success alert — <strong>check it out!</strong>
    </Alert>
  }

  return (
    <div className="container">
      <header>
        <img src={alterdataLogo}/>
      </header>
      <div className="box">
        <img src={alterstateLogo} className="logo" />
        <form className="form" onClick={handleSubmit}>
          <Paper className="input" ><TextField 
            className="field"
            name="Login"
            label="Login"
            variant="outlined" 
            size="small"
          /></Paper>

          <Paper className="input"><TextField 
            className="field"
            id="standard-password-input"
            name="Password"
            label="Password"
            variant="outlined" 
            type="password"
            size="small"
          /></Paper>

          <button className="button" type="submit" >
            Entrar
          </button>
        </form>
      </div>
    </div>

  );
}

export default Login;
