import './home.css'
import {Link} from 'react-router-dom'
import React from 'react';
import { UserPass } from '../../models/usuarioModel';
import history from '../../code/history';

class Home extends React.Component{

    state = {
        isLoading: false,
        usuario:'',
        pass:''
    }

    render(){
        return (
            <div className="body">
            <div className="form-signin">
            <form>
                <div className="box">
                    <img   alt="" width="72" height="57"/>
                </div>
            <h1 className="h3 mb-3 fw-normal">Ingrese Sus Datos Por Favor</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                        defaultValue={this.state.usuario} onChange={(e)=>{this.setState({usuario: e.target.value})}}/>
                    <label htmlFor="floatingInput">Nombre Usuario</label>
                </div>
                <br/>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        defaultValue={this.state.pass} onChange={(e)=>{this.setState({pass: e.target.value})}}/>
                    <label htmlFor="floatingPassword">Contrasena</label>
                </div>
                {!this.state.isLoading? 
                        <button className="w-100 btn btn-lg btn-outline-primary" type="button" onClick={()=>this.loginAdmind(this.state.usuario,this.state.pass)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-award-fill" viewBox="0 0 16 16">
                        <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                         <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                        </svg>Soy Admind</button>: 
                        <button className="w-100 btn btn-lg btn-outline-primary" type="button" >Cargando....</button>}
                    {!this.state.isLoading?
                        <button type="button" className="w-100 btn btn-lg btn-outline-success" onClick={()=>this.loginUser(this.state.usuario,this.state.pass)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>Soy Usuario</button>:
                        <button className="w-100 btn btn-lg btn-outline-primary" type="button" >Cargando....</button>}
                
                    <Link to="/RecuperarPass">
                    <button type="button" className="w-100 btn btn-lg btn-outline-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                        Recuperar Contrasena</button>
                    </Link>
                    <Link to="/RegistroUsuario">
                    <button type="button" className="w-100 btn btn-lg btn-outline-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
                          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z"/>
                        </svg>
                        Registrar Usuario</button>
                    </Link>
            </form>
            </div></div>
        ); 
    }

    loginAdmind(usuario:string,pass:string){
        if (usuario !== "av.edson"){
            alert("No es admind")
            return;
        }
        this.setState({isLoading:true})
        var jsonEnviar:UserPass = {UsserName:usuario,Password:pass}
        fetch('http://localhost:4200/usser/login',{
            method:'POST',
           headers: {"Content-Type":"application/json"},
           body:JSON.stringify(jsonEnviar)
        })
        .then(async response => {
            const json = await response.json() 
            if(!json.Value){alert(json.Ms)}
            else{
                alert(json.Ms)
                this.setState({passCambiada:true})
                history.push(`/InicioAdmind/${usuario}`)
            }this.setState({isLoading:false})}
            )
    }

    loginUser(usuario:string,pass:string){
         this.setState({isLoading:true})
        var jsonEnviar:UserPass = {UsserName:usuario,Password:pass}
        fetch('http://localhost:4200/usser/login',{
            method:'POST',
           headers: {"Content-Type":"application/json"},
           body:JSON.stringify(jsonEnviar)
        })
        .then(async response => {
            const json = await response.json() 
            if(!json.Value){alert(json.Ms)}
            else{
                alert(json.Ms)
                this.setState({passCambiada:true})
                history.push(`/Usser/${usuario}`)
            }this.setState({isLoading:false})}
            )
    }
}



  export default Home;