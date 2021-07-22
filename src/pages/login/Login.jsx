import React from 'react';
import alterdataLogo from '../../assets/alterdata-logo.svg'
import alterstateLogo from '../../assets/alterstate_logo.png'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

import '../../styles/login.css'


function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <header>
        <img src={alterdataLogo} className="image-Login"/>
      </header>
      <div className="box">
        <img src={alterstateLogo} className="logo-Login" />
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
          <Link to="/home" className="link">
            <button className="button" type="submit" >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    </div>

  );
}

export default Login;
