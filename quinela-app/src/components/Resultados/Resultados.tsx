import React from "react";
import './Resultados.css'

export class ResultadosUsser  extends React.Component {
    render() {
      return(
        <div className="resultados">
          <table className="table table-striped table-hover table-light">
          <thead>
            <tr>
            <th scope="col">##</th>
              <th scope="col">Deporte</th>
              <th scope="col">Local</th>
              <th scope="col">Visitante</th>
              <th scope="col">Prediccion</th>
              <th scope="col">Resultado</th>
              <th scope="col">Puntos Otorgados</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
            </tr>
            <tr>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
              <td >...</td>
            </tr>
          </tbody>
          </table>
        </div>
      );
    }
  }