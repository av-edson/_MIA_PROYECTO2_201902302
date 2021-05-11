import React from "react";
import { SPort } from "../../models/usuarioModel";
import { Deporte } from "./Deporte";

export class Deportes extends React.Component{
    componentDidMount = () => {
      this.getParams();
    };
  
    getParams = () => {
        var aux:Array<SPort> = []
        fetch('http://localhost:4200/GetDeportes',{
            method:'GET',
            headers: {"Content-Type":"application/json"}
                }).then(async response =>{
                    //console.log('aca')
                    const json:Array<SPort> = await response.json() 
                    json.forEach(element => {
                        aux.push(element)
                    });
                    this.setState({ listaDeportes:aux})
                    if (this.state.listaDeportes.length < 1) {
                        alert('No Hay Deportes Cargados')
                    }
                })
    };
  
    state = {
      cargado:false,
      mensajeRetorno:"",
      listaDeportes:Array<SPort>()
    } 
  
      render() {
          return (
              <div  style={{textAlign:'center',}}>
                  {this.state.listaDeportes.map(
                      element => <div style={{margin:"100px",display:"inline-block"}}><Deporte key={element.Nombre} Nombre={element.Nombre} Color={element.Color} Src={element.Src}/></div>
                  )}
              </div>
          );
      }
}