import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            
            <Route exact path="/home">
                <Home />
            </Route>

            {/* Redireciona erros 404s para Home */}
            <Redirect to='/login' />
        </Switch>
    </BrowserRouter>
);

export default Routes;
