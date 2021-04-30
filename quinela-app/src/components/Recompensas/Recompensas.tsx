import React from "react";

export class RecompensasUsser  extends React.Component {
    render() {
      return(
        <div className="resultados">
          <table className="table table-striped table-hover table-light">
          <thead>
            <tr>
            <th scope="col">##</th>
              <th scope="col">Usuario</th>
              <th scope="col">Tier</th>
              <th scope="col">Total</th>
              <th scope="col">Ultimo</th>
              <th scope="col">Incremento</th>
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
            </tr>
            <tr>
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