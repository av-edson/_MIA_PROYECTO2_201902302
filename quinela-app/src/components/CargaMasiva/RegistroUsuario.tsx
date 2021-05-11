import React from "react";
import history from '../../code/history';
import { MsReturn, Trigger } from "../../models/usuarioModel";

class RegistroUsuario extends React.Component{

    state = {
        username:'',
        pass:'',
        nombre:'',
        apellido:'',
        correo:'',
        fecha:''
    }

    render() {
        return (
            <div > 
                <div className="form-signin" style={{backgroundColor:"GrayText",minWidth:500}}>
                  <form>
                    <img className="mb-4" src="https://thumbs.dreamstime.com/b/ejemplo-del-vector-icono-de-la-lista-verificaci%C3%B3n-registro-136959398.jpg" alt="new"/>
                    <h1 className="h3 mb-3 fw-normal">Ingrese Datos del Usuario</h1>

                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label">First name</label>
                      <input type="text" className="form-control" id="firstName" placeholder="" required
                      onChange={(e)=>{this.setState({nombre: e.target.value})}}/>
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                
                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label">Last name</label>
                      <input type="text" className="form-control" id="lastName" placeholder=""  required
                        onChange={(e)=>{this.setState({apellido: e.target.value})}}/>
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                
                    <div className="col-12">
                      <label htmlFor="username" className="form-label">Username</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">@</span>
                        <input type="text" className="form-control" id="username" placeholder="Username" required
                            onChange={(e)=>{this.setState({username: e.target.value})}}/>
                      <div className="invalid-feedback">
                          Your username is required.
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                          <label htmlFor="address" className="form-label">Password</label>
                          <input type="text" className="form-control" id="address" placeholder="Password" required
                            onChange={(e)=>{this.setState({pass: e.target.value})}}/>
                          <div className="invalid-feedback">
                            Please enter your shipping address.
                          </div>
                        </div>
                
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" placeholder="you@example.com"
                        onChange={(e)=>{this.setState({correo: e.target.value})}}/>
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>
                    <br/>
                    <div className="col-12">
                        <label htmlFor="birthday" className="form-label">Fecha Nacimiento:</label>
                        <input type="date"  name="Nacimiento" onChange={(e)=>{this.setState({fecha: e.target.value})}}/>
                    </div> 
                    <br/>   
                    <div className="col-12">
                        <button className="w-100 btn btn-lg btn-outline-light" type="button" onClick={()=>this.registrar()}>Registrar</button>
                        <button type="button" className="w-100 btn btn-lg btn-outline-dark" onClick={()=>this.regresar()}>Regresar</button>
                    </div>
                    <p className="mt-5 mb-3" style={{color:"black"}}>&copy; 2017–2021 Bootstrap</p>
                  </form>
                </div>
            </div>
            )
    }

    registrar(){
        if (this.validarDatos()){ 
            var jsonEnviar:Trigger = {
                Username:this.state.username ,
                Pass: this.state.pass,
                Nombre: this.state.nombre,
                Apellido: this.state.apellido,
                Correo: this.state.correo,
                Fecha: this.state.fecha 
            }
            fetch('http://localhost:4200/RegistrarUsuario',{
                method:'POST',
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(jsonEnviar)
              }).then(async response =>{
                    //console.log('aca')
                    const json:MsReturn = await response.json() 
                    alert(json.Ms)
                  })
                }
        else{
              alert('No ha conpletado todos los datos')
        }
        
    }

    limpiarDatos(){
        this.setState({
            username:'',
            pass:'',
            nombre:'',
            apellido:'',
            correo:'',
            fecha:''
        })
    }

    validarDatos():boolean{
        if (this.state.apellido!==''&&this.state.nombre!==''&&this.state.username!==''&&this.state.correo!==''&&this.state.pass!==''&&this.state.fecha!=='') {
            return true
        }
        return false
    }

    regresar(){
        history.push(`/`)
    }
} 
export {RegistroUsuario}