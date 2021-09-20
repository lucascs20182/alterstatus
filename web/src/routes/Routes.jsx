import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { obterTokenDaStorage } from '../utils/Storage';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';

const isAuthenticated = () => {
  let [token,] = obterTokenDaStorage();

  return token ? true : false;
}

const RotaPrivada = ({ component: Component, ...rest }) => (
  <Route {...rest} render={
    props => isAuthenticated() ?
      <Component {...props} />
      :
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
  }
  />
);

const Rotas = () => (
  <Switch>
    <Route exact path="/login" component={Login} />

    {/**
       * ThemeProvider não é reconhecido pelo Switch
       * gera warning de Failed prop type
       * 
       * Adicionei o ThemeProvider diretamente na Home
       * antes das divs que exportavam o AppBar
       * por isso não deve afetar nada
       * 
       * Mas verificar se algum bug foi gerado
       */}
    <RotaPrivada path="/" component={Home} />

    {/* Redireciona erros 404s para Home */}
    <Redirect to='/' />
  </Switch>
);

export default Rotas;
