import React from 'react';
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import { Switch, Route, BrowserRouter, Redirect  } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

import {autenticacaoHome} from '../pages/home/Home'

const RotaPrivada = ({ component: Component, ...rest}) => (
  <Route {...rest} 
  render={props =>
    autenticacaoHome() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={ { pathname: "/", state: { from: props.location } } }/>
    )
    }
  />

);

// const Rotas = () => (
//   <BrowserRouter>
//     <switch>
//       <Rotas exact path="/" component={Login}/>
//       <RotaPrivada path="/Home" component={Home}/>
//     </switch>
//   </BrowserRouter>
// );


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

//   function Routes() {
//   //browserrouter
//   return (
//     <BrowserRouter>
//     <Switch>
//       <Route exact path="/" >
//         <Login />
//       </Route >
//       <ThemeProvider theme={theme}>
//         <RotaPrivate path="/home" exact>
//           <Home/>
//         </RotaPrivate>
//       </ThemeProvider>
//     </Switch>
//     </BrowserRouter>
//   )
// }

const Rotas = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <ThemeProvider theme={theme}>
      <RotaPrivada path="/Home" component={Home}/>
      </ThemeProvider>
    </Switch>
  </BrowserRouter>
);

export default Rotas