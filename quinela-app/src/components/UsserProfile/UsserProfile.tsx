import React from 'react';
import './UsserProfile.css';
import {Link} from 'react-router-dom'
import { UserPass } from '../../models/usuarioModel';

export class UsserProfile extends React.Component {

  constructor(props:any){
    super(props);
    this.state.usuario = props.usuario
  }

  state = {
    usuario: '',
    pass: '',
    loading:false,
    mensajeRetorno:''
  }

    render() {
        return (
          <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <div className="well well-sm">
                        <div className="row">
                            <div className="col-sm-6 col-md-4">
                                <img src="https://onlinebusinessuniversity.org/blog/wp-content/uploads/2016/06/no-profile-img-240x300.gif" alt="" className="img-rounded img-responsive" />
                            </div>
                            <div className="col-sm-6 col-md-8">
                                <h4>Edson Avila</h4>
                                <h4>@UsserName</h4>
                                <p>
                                    <i className="glyphicon glyphicon-envelope"></i>email@example.com
                                    <br />
                                    <i className="glyphicon glyphicon-globe"></i><a href="http://www.jquery2dotnet.com">www.jquery2dotnet.com</a>
                                    <br />
                                    <i className="glyphicon glyphicon-gift"></i>June 02, 1988</p>
                                    <Link to="/">
                                    <button type="button" className="btn btn-outline-warning">Salir</button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 offset-md-3">
                <div className="form-signin">
                  <form>
                          <h1 className="h3 mb-3 fw-normal">Cambiar Contrasena</h1>
                      <div className="form-floating">
                          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            defaultValue={this.state.pass}  onChange={(e)=>{this.setState({pass: e.target.value})}}/>
                          <label className="lbl" htmlFor="floatingPassword">Nueva Contrasena</label>      
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Guardar</button>
                      </div>
                  </form>
                </div>
                </div>
            </div>
          
                        
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Quinela Dice:</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">{this.state.mensajeRetorno}</div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
        );
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
          alert("Contrasena Cambiada Con Exito")
          this.setState({passCambiada:true})
          }
        this.setState({loading:false})
      })
    }
}

