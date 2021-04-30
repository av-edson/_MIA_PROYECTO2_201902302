package db

import (
	"database/sql"
	"fmt"
	"log"

	"../../config"
	"../../models"
)

func GetUsuarios() []models.UsuarioModel {
	db, err := sql.Open("godror", "edson/1234@localhost:1521/xe")
	if err != nil {
		fmt.Println(err)
		return nil
	}
	defer db.Close()

	rows, err := db.Query("SELECT NOMBRE,APELLIDO,USSER,PASSUSER FROM usuario")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return nil
	}
	defer rows.Close()

	salida := make([]models.UsuarioModel, 0)
	for rows.Next() {
		var id2 string
		var id3 string
		var id4 string
		var id5 string

		if err := rows.Scan(&id2, &id3, &id4, &id5); err != nil {
			log.Fatal(err)
		}
		var tempUser models.UsuarioModel
		tempUser.Nombre = id2
		tempUser.Apellido = id3
		tempUser.UsserName = id4
		tempUser.Password = id5
		salida = append(salida, tempUser)
	}
	return salida
}

func GetPassUsuario(user string) string {
	db, err := config.SetConection()
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer db.Close()

	var salida string
	var consulta = "SELECT PASSUSER FROM USUARIO WHERE USSER = '" + user + "'"
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return ""
	}
	defer rows.Close()

	for rows.Next() {
		rows.Scan(&salida)
	}
	return salida
}

func VerificarUserDb(user string) bool {
	db, err := config.SetConection()
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer db.Close()
	var consulta = "SELECT COUNT(*) FROM USUARIO WHERE USSER='" + user + "'"
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return false
	}
	defer rows.Close()
	var resultado string
	for rows.Next() {
		rows.Scan(&resultado)
	}
	if resultado != "0" {
		return true
	} else {
		return false
	}
}

func ActualizarPass(pass string, user string) bool {
	if !VerificarUserDb(user) {
		return false
	}
	db, err := config.SetConection()
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer db.Close()
	var consulta = "UPDATE USUARIO SET PASSUSER ='" + pass + "' WHERE USSER='" + user + "'"
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return false
	}
	defer rows.Close()
	return true
}
