import React from 'react';
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

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

export default function Routes() {
  
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <ThemeProvider theme={theme}>
        <Route path="/home" exact>
          <Home/>
        </Route>
      </ThemeProvider>
    </Switch>
  )
}