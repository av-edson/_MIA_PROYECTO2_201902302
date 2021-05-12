import React from "react";
import { UsuarioModel } from "../../models/usuarioModel";

export class PeUsuario extends React.Component<UsuarioModel>{
    componentDidMount = () => {
        this.setState({
            Apellido: this.props.Apellido,
            Nombre: this.props.Nombre,
            Password: this.props.Password, 
            UsserName: this.props.UsserName
        })
      };
    state = {
        Apellido: '',
        Nombre: '',
        Password: '', 
        UsserName: ''
    }
    render() {
        return (
                <div>
                    <div>
                <div className="card text-white bg-dark mb-3    " style={{width: "13rem"}}>
                    <img src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" className="card-img-top" alt="new"></img>
                    <div className="card-body">
                        <h5 className="card-title">Usser: {this.state.UsserName}</h5>
                        <p className="card-text">Nombre: {this.state.Nombre}</p>
                        <p className="card-text">APellido: {this.state.Apellido}</p>
                    </div>
                </div>
              </div>
                </div>
            )
    }
}