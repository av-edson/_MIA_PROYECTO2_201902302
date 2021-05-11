import './Usser.css'
import React from 'react';
import { UsserProfile } from '../UsserProfile/UsserProfile';
import { UserPass } from '../../models/usuarioModel';
import { MembresiaUsser } from '../MembresiaUsuario/Membresia';
import { EventosUsser } from '../Eventos/Eventos';
import { ResultadosUsser } from '../Resultados/Resultados';
import { TablaPosiciones } from '../TablaPosiciones/TablaPosiciones';
import { RecompensasUsser } from '../Recompensas/Recompensas';
//import { useLocation } from 'react-router-dom'

//function HeaderView() {
//  let location = useLocation();
//  console.log(location.pathname);
//  console.log('aca puto')
//  //return <span>Path : {location.pathname}</span>
//}

export class NavBar extends React.Component{
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

    //let {path} = useRouteMatch()
    //console.log()
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
                  <button type="button" className="btn btn-outline-light" onClick={()=>this.canbiarVista(1)}>Pagar Membresia
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"/>
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"/>
                </svg>
                </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(2)}>Eventos
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                  </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(3)}>Resultados
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                  </button>
              </li>
              <li className="nav-item">
                  <button type="button" className="btn btn-outline-light"onClick={()=>this.canbiarVista(4)}>Tabla Posiciones
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
               <MembresiaUsser uss={this.state.usuario}/>
              }
              {this.state.noVista===2 && 
                <EventosUsser/>
              }
              {this.state.noVista===3 && 
                <ResultadosUsser/>
              }
              {this.state.noVista===4 && 
                <TablaPosiciones/>
              }
              {this.state.noVista===5 &&  
                <RecompensasUsser/>
              }
            </div>
      </div>
    
    );}
}



