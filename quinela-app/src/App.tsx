import Home from './components/home/home'
import {Recupera} from './components/RecuperarDatos/Recuperar'
import { NavBar } from "./components/Usser/Usser";
import { NavAdmind } from "./components/navBarAdmind/navBarAdmind";
import './App.css'
import {Redirect, Route,Router} from 'react-router-dom'
import history from "./code/history";
import React from 'react';
import { RegistroUsuario } from './components/CargaMasiva/RegistroUsuario';

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
            <Route exact path="/InicioAdmind/:user" component={NavAdmind}>
            </Route>

            <Route exact path="/RegistroUsuario" component={RegistroUsuario}></Route>

            <Route exact path="/Usser/:user" component={NavBar}/>
            <Route path="/404" component={Home} />
            <Redirect to="/" />
        </Router>
      </div>
    );
  }

}

export default App;
