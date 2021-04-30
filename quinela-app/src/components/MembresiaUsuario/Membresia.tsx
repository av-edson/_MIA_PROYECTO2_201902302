import React from "react";
import './Membresia.css'

export class MembresiaUsser  extends React.Component {
    render() {
      return(
          <div className="contenedor">
            <h1>Estado Membresia: </h1>
            <div className="cambio">
                <div className="form-check chbox">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Gold
                  </label>
                </div>
                <div className="form-check chbox">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Silver
                  </label>
                </div>
                <div className="form-check chbox">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Bronze
                  </label>
                </div>
                <button  type="button" className="btn btn-outline-info bbt" data-bs-toggle="modal" data-bs-target="#ModeloMembresia">Adquirir</button>
                <button type="button" className="btn btn-outline-warning bbt" data-bs-toggle="modal" data-bs-target="#ModeloMembresia">Cambiar</button>
            </div>
            <div className="modal fade" id="ModeloMembresia" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Membresia Actualizada</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">Mensaje de Retorno XD</div>
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