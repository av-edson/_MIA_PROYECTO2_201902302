import React from "react";
import { UserPass } from "../../models/usuarioModel";
import { Deportes } from "../CargaMasiva/Deportes";
import { CargaMasiva } from "../CargaMasiva/Masiva";
import { UsserProfile } from "../UsserProfile/UsserProfile";

export class NavAdmind  extends React.Component{
    private params: any;

    componentDidMount = () => {
      this.getParams();
    };
  
    getParams = () => {
      this.params = this.props;
      //console.log(this.params)
      this.setState({ usuario: this.params.match.params.user});
      //pidiendo los otros datos y setenadolos
      var jsonEnviar:UserPass = {UsserName:this.params.match.params.user,Password:''}
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
      mensajeRetorno:'',
      noVista:-1
    }

    canbiarVista(nueva:number){
      this.setState({noVista:nueva})
    }
  
      render() {
          return (
            <div>
        <div className="barra">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light" onClick={()=>this.canbiarVista(0)}>Mi Perfil  
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-file-person-fill" viewBox="0 0 16 16">
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"/>
                  </svg>
                  </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light" onClick={()=>this.canbiarVista(1)}>Quinelas
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"/>
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"/>
                </svg>
                </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(2)}>Carga Masiva
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                  </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(3)}>Jornadas
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                  </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(4)}>Temporadas
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                </svg>
                  </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(5)}>Recompensas
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16">
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
                </svg>
                  </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(6)}>Deportes
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-display" viewBox="0 0 16 16">
                    <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/>
                  </svg>
                  </button>
              </li> 
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(7)}>Reportes
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                  </svg>
                  </button>
              </li>
            </ul>
          </div>
        </div>
        </nav>
      </div>
      
            <div>
              {this.state.noVista===0 && 
                <UsserProfile uss={this.state.usuario}/>
              }
              {this.state.noVista===1 && 
               <h2>vista 1</h2>
              }
              {this.state.noVista===2 && 
                <CargaMasiva/>
              }
              {this.state.noVista===3 && 
                <h2>vista 3</h2>
              }
              {this.state.noVista===4 && 
                <h2>vista 4</h2>
              }
              {this.state.noVista===5 && 
                <h2>vista 5</h2>
              }
              {this.state.noVista===6 && 
                <Deportes/>
              }
              {this.state.noVista===7 && 
                <h2>vista 7</h2>
              }
            </div>
      </div>
    
          );
      }
  
}