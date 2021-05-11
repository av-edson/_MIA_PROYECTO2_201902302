import React from "react";
import { SPort } from "../../models/usuarioModel";

export class Deporte extends React.Component<SPort>{
    componentDidMount = () => {
      this.getParams();
    };
  
    getParams = () => {
        this.setState({Nombre:this.props.Nombre,
        Color:this.props.Color,
        Src:this.props.Src})
    };
  
    state = {
      Nombre:"",
      Color:"",
      Src:"" 
    }
  
      render() {
          return (
              <div>
                <div className="card text-white bg-dark mb-3    " style={{width: "18rem"}}>
                    <img src={this.state.Src} className="card-img-top" alt="new"></img>
                    <div className="card-body">
                        <h5 className="card-title">Nomber: {this.state.Nombre}</h5>
                        <p className="card-text">{this.state.Color}</p>
                        <button type="button" className="btn btn-outline-success">Cambiar Color</button>
                    </div>
                </div>
              </div>
          );
      }
}