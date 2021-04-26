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
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1 className="header">Bienvenido Quinela App</h1>
      <Router>
        <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/RecuperarPass">
            <Recupera/>
          </Route>
          <Route exact path="/Usser">
            <NavBar/>
            <UsserProfile/>
          </Route>
          <Route exact path="/Usser/Profile">
            <NavBar/>
            <UsserProfile/>
          </Route>
          <Route exact path="/Usser/Membreship">
            <NavBar/>
            <MembresiaUsser/>
          </Route>
          <Route exact path="/Usser/Event"><NavBar/><EventosUsser/></Route>
          <Route exact path="/Usser/Resultados"><NavBar/><ResultadosUsser/></Route>
          <Route exact path="/Usser/TablaPosiciones"><NavBar/><TablaPosiciones/></Route>
          <Route exact path="/Usser/Recompensas"><NavBar/><RecompensasUsser/></Route>
          <Route path="/404" component={Home} />
          <Redirect to="/" />
      </Router>
    </div>
  );
}

export default App;
