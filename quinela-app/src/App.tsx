import Home from './components/home/home'
import {Recupera} from './components/RecuperarDatos/Recuperar'
import { NavBar } from "./components/Usser/Usser";
import {UsserProfile} from "./components/UsserProfile/UsserProfile";
import { MembresiaUsser } from "./components/MembresiaUsuario/Membresia";
import { EventosUsser } from "./components/Eventos/Eventos";
import { RecompensasUsser } from "./components/Recompensas/Recompensas";
import { ResultadosUsser } from "./components/Resultados/Resultados";
import { TablaPosiciones } from "./components/TablaPosiciones/TablaPosiciones";
import './App.css'
import {Redirect, Route,Router} from 'react-router-dom'
import history from "./code/history";
import React from 'react';

class App extends React.Component {
  handleUsuario = () => {
    console.log("funcion de padre")
  }

  render() {
    return (
      <div className="App">
        <h1 className="header">Bienvenido Quinela App</h1>
        <Router history={history}>
          <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/RecuperarPass">
              <Recupera/>
            </Route>
            <Route  path="/Usser">
              <NavBar/>
            </Route>
                  <Route
                  path="/Usser"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={UsserProfile} exact />
                      <Route path={`${url}/Profile`} component={UsserProfile} />
                      <Route path={`${url}/Membreship`} component={MembresiaUsser} />
                      <Route path={`${url}/Event`} component={EventosUsser} />
                      <Route path={`${url}/Resultados`} component={ResultadosUsser} />
                      <Route path={`${url}/TablaPosiciones`} component={TablaPosiciones} />
                      <Route path={`${url}/Recompensas`} component={RecompensasUsser} />
                    </>
                  )}
                />
            <Route path="/404" component={Home} />
            <Redirect to="/" />
        </Router>
      </div>
    );
  }

}

export default App;
