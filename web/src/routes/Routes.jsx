import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { obterTokenDaStorage } from '../utils/Storage';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#094B89',
    },
  },

});

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
    <Switch>
      <Route exact path="/" component={Login}/>

      <ThemeProvider theme={theme}>
      <RotaPrivada path="/home" component={Home}/>

      {/* Redireciona erros 404s para Home */}
      <Redirect to='/home' />
      </ThemeProvider>
    </Switch>
);

export default Rotas;
