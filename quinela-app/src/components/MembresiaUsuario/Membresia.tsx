import React from "react";
import { Membresia, MsReturn } from "../../models/usuarioModel";
import './Membresia.css'
type MisProps ={
  uss:string
}
export class MembresiaUsser  extends React.Component<MisProps> {
  private params: any;
  componentDidMount = () => {
    this.getParams();
  };

  state = {
    usuario:'',
    tipoMemebresia:'',
    idTIpoMembresia:'',
    cambio:false,
    tipocambio:'', 
    intCambio:'',
    mensaje:''
  }

  getParams = () => {
    this.params = this.props;
    this.setState({usuario:this.props.uss})
    var jsonEnviar:Membresia = {Username:this.params.uss,Id:'',Value:false}
    fetch('http://localhost:4200/usser/datosMembresia',{
      method:'POST',
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify(jsonEnviar)
    }).then(async response =>{
          const json:Membresia = await response.json() 
          if(json.Value===true){
            this.setState({ tipoMemebresia:json.Username,
              idTIpoMembresia:json.Id})
          }else{
            this.setState({tipoMemebresia:'No Tiene'})
          }
        })
  };

  cambiar(d:number){
    var g:string = ""
    var h:string = ""
    switch (d) {
      case 1:
        g="Gold"
        h="1"
        break;
      case 2:
        g="Silver"
        h="2"
        break;
      case 3:
        g="Bronze"
        h="3"
        break;
    }
    this.setState({ cambio:true,
        tipocambio:g,
        intCambio:h})
  }

  Actualizar(){
    this.setState({mensaje:"Por Favor Espere"})
    var jsonEnviar:Membresia={
      Username: this.state.usuario,
      Id: this.state.intCambio,
      Value:false
    }
    fetch('http://localhost:4200/usser/actualizarMembresia',{
      method:'POST',
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify(jsonEnviar)
    }).then(async response =>{
          const json:MsReturn = await response.json() 
          this.setState({mensaje:json.Ms})
        }).then(()=> this.getParams())
  }

    render() {
      return(
          <div className="contenedor">
            <h1>Estado Membresia: </h1>
            <br/>
            <div className="cambio">
                <div className="btn-group-lg" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-warning"  onClick={()=>this.cambiar(1)}>Gold</button>
                  <button type="button" className="btn btn-secondary" onClick={()=>this.cambiar(2)}>Silver</button>
                  <button type="button" className="btn btn-danger"onClick={()=>this.cambiar(3)} >Bronze</button>
                </div>
                <button  type="button" className="btn btn-outline-info bbt" data-bs-toggle="modal" data-bs-target="#ModeloMembresia">Adquirir</button>
                <button type="button" className="btn btn-outline-warning bbt" data-bs-toggle="modal" data-bs-target="#ModeloMembresia" 
                  onClick={()=> this.Actualizar()}>Cambiar</button>
              <h2>La membresia actual es: {this.state.tipoMemebresia}</h2>            
              <div>
                {this.state.cambio? <h2>Quiere adquirir la membresia tipo: {this.state.tipocambio}?</h2> :<div></div>}
              </div>
            </div>
            <div className="modal fade" id="ModeloMembresia" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Membresia Actualizada</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">{this.state.mensaje}</div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
      );
    }
  }