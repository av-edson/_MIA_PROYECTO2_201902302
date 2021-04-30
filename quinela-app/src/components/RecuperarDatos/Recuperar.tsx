import './Recuperar.css'
import {Link} from 'react-router-dom'
import React from 'react';
import { UserPass } from "../../models/usuarioModel";

import history from '../../code/history';

  export class Recupera extends React.Component {
    
    state = {
      usuario: '',
      pass: '',
      loading:false,
      passCambiada:false
    }
    
    cambiarPass(usuario:string,pass:string){
        this.setState({loading:true})
        var jsonEnviar:UserPass = {UsserName:usuario,Password:pass}
         fetch('http://localhost:4200/usser/changePass',{
           method:'POST',
           headers: {"Content-Type":"application/json"},
           body:JSON.stringify(jsonEnviar)
         }).then(async response => {
          const json = await response.json() 
          if (json.Value === false){ alert(json.Ms)}
          else{
            alert("yesss")
            this.setState({passCambiada:true})
            history.push("/")
            }
          this.setState({loading:false})
        })
      }
    

    render() {
        return ( 
            <div className="body">
            <div className="form-signin">
            <form>
                <div className="box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                          <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        </svg>
                </div>
            <h1 className="h3 mb-3 fw-normal">Recuperar Contrasena</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" 
                      defaultValue={this.state.usuario} onChange={(e)=>{this.setState({usuario: e.target.value})}}/>
                    <label htmlFor="floatingInput">Nombre Usuario</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" 
                      defaultValue={this.state.pass}  onChange={(e)=>{this.setState({pass: e.target.value})}}/>
                    <label htmlFor="floatingPassword">Nueva Contrasena</label>
                </div>
                    {!this.state.loading? 
                    <button className="w-100 btn btn-lg btn-outline-primary" type="button" onClick={()=>this.cambiarPass( this.state.usuario,this.state.pass)}>Guardar</button> 
                    : <button className="w-100 btn btn-lg btn-outline-primary" type="button" >Cargando....</button>}
                    {this.state.passCambiada &&
                    <Link to="/"><button className="w-100 btn btn-lg btn-outline-warning" type="button" >Regresar</button></Link>
                    }
            </form>
          </div>
          </div>
        );
      }
}