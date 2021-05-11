import React from 'react';
import './UsserProfile.css';
import {Link} from 'react-router-dom'
import { UserPass } from '../../models/usuarioModel';

type MisProps ={
  uss:string
}

export class UsserProfile extends React.Component<MisProps> {

  private params: any;

  componentDidMount = () => {
    this.getParams();
  };

  getParams = () => {
    this.params = this.props;
    var usse:string
    if (this.props.uss==='av.edson'){
      usse = this.props.uss
      this.setState({ usuario: this.props.uss});
    }else{
      usse=this.props.uss
      this.setState({ usuario: this.props.uss});
    }
    //pidiendo los otros datos y setenadolos
    var jsonEnviar:UserPass = {UsserName:usse,Password:''}
    fetch('http://localhost:4200/getUserData',{
      method:'POST',
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify(jsonEnviar)
    }).then(async response =>{
          //console.log('aca')
          const json = await response.json() 
          var nombre = json.Nombre+" " + json.Apellido 
          //console.log(nombre)
          this.setState({ nombre:nombre})
        })
  };

  state = {
    usuario: '',
    pass: '',
    nombre: '',
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
                                <h4>Nombre: {this.state.nombre}</h4>
                                <h4>Usser: {this.state.usuario}</h4>
                                <br/><br/><br/><br/>
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
                          <input  className="form-control" id="floatingPassword" placeholder="Password"
                            defaultValue={this.state.pass}  onChange={(e)=>{this.setState({pass: e.target.value})}}/>
                          <label className="lbl" htmlFor="floatingPassword">Nueva Contrasena</label>      
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                           onClick={()=>this.cambiarPass()} >Guardar</button>
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

    cambiarPass(){
      this.setState({loading:true})
      var jsonEnviar:UserPass = {UsserName:this.state.usuario,Password:this.state.pass}
       fetch('http://localhost:4200/usser/changePass',{
         method:'POST',
         headers: {"Content-Type":"application/json"},
         body:JSON.stringify(jsonEnviar)
       }).then(async response => {
        const json = await response.json() 
        if (json.Value === true){
          //alert("Contrasena Cambiada Con Exito")
          this.setState({passCambiada:true})
          }
        this.setState({loading:false,
          mensajeRetorno:json.Ms,
          pass:""})
      })
    }
}

