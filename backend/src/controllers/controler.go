package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"../models"
	"./db"
	"./funciones"
	"./masive"
)

func GetP(w http.ResponseWriter, r *http.Request) {
	//fmt.Println(funciones.GetMD5Hash("1234"))
	salida := db.GetUsuarios()
	if salida != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(salida)
	} else {
		fmt.Fprintf(w, "Error en consulta")
	}
	//w.Header().Set("Content-Type", "application/json")
	//w.WriteHeader(http.StatusCreated)
	//json.NewEncoder(w).Encode(salida)

}

func ValidarLogin(w http.ResponseWriter, r *http.Request) {
	var datos models.UserPass
	reqBody, err := ioutil.ReadAll(r.Body)
	var mens models.Mensaje
	if err != nil {
		mens.Ms = "No se envio un archivo adecuado al servidor"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(mens)
	}
	// leyendo datos de post
	json.Unmarshal(reqBody, &datos)
	datos.Password = funciones.GetMD5Hash(datos.Password)
	// comparando con la db
	var dbPass = db.GetPassUsuario(datos.UsserName)
	// regresando la aprobacion o negacion
	if dbPass == datos.Password {
		mens.Ms = "pass correcta"
		mens.Value = true
	} else if dbPass == "" {
		mens.Ms = "El usuario no se encuentra registrado"
		mens.Value = false
	} else {
		mens.Ms = "contrasena inconrrecta"
		mens.Value = false
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(mens)
}

func CambiarPass(w http.ResponseWriter, r *http.Request) {
	var datos models.UserPass
	reqBody, err := ioutil.ReadAll(r.Body)
	var mens models.Mensaje
	if err != nil {
		mens.Ms = "No se envio un archivo adecuado al servidor"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(mens)
	}
	// leyendo datos de post
	json.Unmarshal(reqBody, &datos)
	datos.Password = funciones.GetMD5Hash(datos.Password)
	// modificar en db
	if db.ActualizarPass(datos.Password, datos.UsserName) {
		mens.Ms = "Actualizado Correctamente"
		mens.Value = true
	} else {
		mens.Ms = "Error al actualizar, verifique su usuario"
		mens.Value = false
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(mens)
}

func CargaMasiva(w http.ResponseWriter, r *http.Request) {
	var path models.Mensaje
	reqBody, err := ioutil.ReadAll(r.Body)
	var mens models.Mensaje
	if err != nil {
		mens.Ms = "Error al leer el json pasa cargar dato"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(mens)
	}
	// leyendo datos de post
	json.Unmarshal(reqBody, &path)
	// llamando al db controller
	if masive.Cargar(path.Ms) {
		mens.Ms = "Cargado Con exito"
		mens.Value = true
	} else {
		mens.Ms = "Hubo un problema al aplicar la carga masiva"
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(mens)
}
