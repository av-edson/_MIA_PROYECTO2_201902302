import React from "react";
import { MsReturn } from "../../models/usuarioModel";

export class CargaMasiva extends React.Component{
    componentDidMount = () => {
      this.getParams();
    };
  
    getParams = () => {};
  
    state = {
      cargado:false,
      mensajeRetorno:""
    }
  
      render() {
          return (
            
                <div className="card text-center text-white bg-dark mb-3">
                  <div className="card-header">
                    Bienvenido a la Carga Masiva
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Cargar Datos</h5>
                    <p className="card-text">Todos los datos se cargaran desde los archivos seteados en el backend</p>
                    {!this.state.cargado?
                    <button type="button" className="btn btn-outline-success" onClick={()=> this.CargarDatos()}
                    data-bs-toggle="modal" data-bs-target="#exampleModal">CargarDatos</button>:
                    <button type="button" className="btn btn-success" disabled>Ya se Cargaron los Datos</button>}
                  </div>
                  <div className="card-footer text-muted">
                    by edson
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

      CargarDatos(){
        var jsonEnviar:MsReturn = {Ms:  "/home/edson/Escritorio/pequeno.yaml",Value: false}
        fetch('http://localhost:4200/MasiveLoad',{
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(jsonEnviar)
          }).then(async response =>{
            //console.log('aca')
            const json:MsReturn = await response.json() 
            //console.log(nombre)
            this.setState({ mensajeRetorno:json.Ms})
            this.setState({cargado:json.Value})
          })
        }
}