import React from 'react';
import { Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

import { obterTokenDaStorage } from '../utils/Storage';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';

const isAuthenticated = () => {
  let [token, ] = obterTokenDaStorage();

  return token ? true : false;
}

const RotaPrivada = ({ component: Component, ...rest}) => (
  <Route { ...rest } render={
    props => isAuthenticated() ?
      <Component { ...props } />
    :
      <Redirect to={{ pathname: "/", state: { from: props.location } }} />    
    }
  />
);

const Rotas = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <RotaPrivada path="/home" component={Home}/>

      {/* Redireciona erros 404s para Home */}
      <Redirect to='/home' />
    </Switch>
  </BrowserRouter>
);

export default Rotas;
