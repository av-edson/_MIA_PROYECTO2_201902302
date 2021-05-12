import React from "react";
import { UsuarioModel } from "../../models/usuarioModel";
import { PeUsuario } from "./peUsuario";

export class ListaUsuarios extends React.Component{
    componentDidMount = () => {
        this.getParams();
      };

      state = {
          listaUsuarios:Array<UsuarioModel>()
      }
    
      getParams = () => {
          var aux:Array<UsuarioModel> = []
          fetch('http://localhost:4200/getUsuarios',{
              method:'GET',
              headers: {"Content-Type":"application/json"}
                  }).then(async response =>{
                      //console.log('aca')
                      const json:Array<UsuarioModel> = await response.json() 
                      json.forEach(element => {
                          aux.push(element)
                      });
                      this.setState({ listaUsuarios:aux})
                      if (this.state.listaUsuarios.length < 1) {
                          alert('No Hay Deportes Cargados')
                      }
                  })
      };
    render() {
        return (
                <div  style={{textAlign:'center',}}>
                    {this.state.listaUsuarios.map(
                        element => <div style={{margin:"100px",display:"inline-block"}}><PeUsuario key={element.UsserName} Nombre={element.Nombre} Apellido={element.Apellido} UsserName={element.UsserName} Password={element.Password}/></div>
                    )}
                </div>
            )
    }
}

