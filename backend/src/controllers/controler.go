package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"../models"
	"./db"
	"./funciones"
	"./masive"
)

func GetP(w http.ResponseWriter, r *http.Request) {
	for i := 2; i < 72; i++ {
		// usuarios = append(usuarios, c.U2)
		var s = "usuarios = append(usuarios, c.U" + strconv.Itoa(i) + ")"
		fmt.Println(s)
	}
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
	var dbPass = db.GetPassUsuario(datos.UsserName, datos.Password)
	// regresando la aprobacion o negacion
	if dbPass == "1" {
		mens.Ms = "pass correcta"
		mens.Value = true
	} else {
		mens.Ms = "datos inconrrectos"
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

func GetUserData(w http.ResponseWriter, r *http.Request) {
	var datos models.UserPass
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(datos)
	}
	// leyendo datos de post
	json.Unmarshal(reqBody, &datos)
	// despues de leer
	salida := db.GetUsuario(datos.UsserName)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(salida)

}

func GetDeportes(w http.ResponseWriter, r *http.Request) {
	salida := db.GetDeportes()
	if salida != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(salida)
	} else {
		fmt.Fprintf(w, "Error en consulta")
	}
}

func RegistroTrigger(w http.ResponseWriter, r *http.Request) {
	var datos models.Trigger
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
	// LINEA COMENTADA PARA MANDAR LA CONTRA SIN MD5
	//datos.Pass = funciones.GetMD5Hash(datos.Pass)

	salida := db.RegistrarUsuario(datos)
	mens.Ms = salida
	if salida == "Ingresado con exito!" {
		mens.Value = true
	} else {
		mens.Value = false
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(mens)
}
