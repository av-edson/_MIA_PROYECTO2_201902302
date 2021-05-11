package db

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"

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

func GetPassUsuario(user string, pass string) string {
	db, err := config.SetConection()
	if err != nil {
		fmt.Println(err)
		return ""
	}
	defer db.Close()

	var salida string
	consulta := "SELECT COUNT(*) FROM USUARIO WHERE USSER='" + user + "' AND PASSUSER='" + pass + "'"
	//fmt.Println(consulta)
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
	//fmt.Println(salida)
	return salida
}

func VerificarUserDb(user string, tipo int) bool {
	db, err := config.SetConection()
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer db.Close()
	var consulta = ""
	if tipo == 1 {
		consulta = "SELECT COUNT(*) FROM USUARIO WHERE USSER='" + user + "'"
	} else {
		consulta = "SELECT COUNT(*) FROM USUARIO_TRIGGER WHERE USERNAME='" + user + "'"
	}
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
	if !VerificarUserDb(user, 1) {
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

func GetUsuario(user string) models.UsuarioModel {
	var temp models.UsuarioModel
	db, err := sql.Open("godror", "edson/1234@localhost:1521/xe")
	if err != nil {
		fmt.Println(err)
		return temp
	}
	defer db.Close()

	rows, err := db.Query("SELECT NOMBRE,APELLIDO,USSER FROM usuario WHERE USSER='" + user + "'")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return temp
	}
	defer rows.Close()

	for rows.Next() {
		var id2 string
		var id3 string
		var id4 string

		if err := rows.Scan(&id2, &id3, &id4); err != nil {
			log.Fatal(err)
		}
		var tempUser models.UsuarioModel
		tempUser.Nombre = id2
		tempUser.Apellido = id3
		tempUser.UsserName = id4
		temp = tempUser
	}
	return temp
}

func GetDeportes() []models.Deporte {
	db, err := sql.Open("godror", "edson/1234@localhost:1521/xe")
	if err != nil {
		fmt.Println(err)
		return nil
	}
	defer db.Close()

	rows, err := db.Query("SELECT DESCRIPCION FROM DEPORTE")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return nil
	}
	defer rows.Close()

	salida := make([]models.Deporte, 0)
	i := 0
	for rows.Next() {
		var id2 string
		if err := rows.Scan(&id2); err != nil {
			log.Fatal(err)
		}
		var tempUser models.Deporte
		tempUser.Nombre = id2
		tempUser.Color = "rojo " + strconv.Itoa(i)
		tempUser.Src = "https://static.vecteezy.com/system/resources/previews/000/348/985/non_2x/vector-indoor-sport-game-athletic-set-icon-symbol-sign-pictogram.jpg"
		salida = append(salida, tempUser)
	}
	return salida
}

func RegistrarUsuario(data models.Trigger) string {
	// si ya se encuentra el usuario
	if VerificarUserDb(data.Username, 2) {
		return "EL usuario ya existe"
	}
	db, err := config.SetConection()
	if err != nil {
		fmt.Println(err)
		return "La conexion a la DB fallo"
	}
	defer db.Close()
	var consulta = "INSERT INTO USUARIO_TRIGGER VALUES('" + data.Username + "','" + data.Nombre + "','" + data.Apellido + "','" + data.Pass + "','" + data.Correo + "',TO_DATE('" + data.Fecha + "','RR-MM-DD'),2)"
	fmt.Println(consulta)
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return "No paso las validaciones del trigger"
	}
	defer rows.Close()
	return "Ingresado con exito!"
}

func PedirDatosMembresia(data string) []string {
	salida := make([]string, 0)
	// si ya se encuentra el usuario
	db, err := config.SetConection()
	if err != nil {
		fmt.Println(err)
		return salida
	}
	defer db.Close()
	var consulta = "SELECT D.idtemporada,D.idmembresia,m.descripcion,D.idusuario FROM (SELECT *\n" +
		"FROM usuario_temporada_membresia\n" +
		"where usuario_temporada_membresia.idusuario=(select idusuario from usuario where usser='" + data + "')\n" +
		"ORDER BY idtemporada DESC) D, membresia M\n" +
		"WHERE ROWNUM <= 1 and D.idmembresia=m.idmebresia"
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return salida
	}
	defer rows.Close()
	for rows.Next() {
		var id1 string
		var id2 string
		var id3 string
		var id4 string
		if err := rows.Scan(&id1, &id2, &id3, &id4); err != nil {
			log.Fatal(err)
		}
		salida = append(salida, id1)
		salida = append(salida, id2)
		salida = append(salida, id3)
		salida = append(salida, id4)

	}
	return salida
}

func ActualizarMembresia(id string, us string) string {
	db, err := config.SetConection()
	if err != nil {
		fmt.Println(err)
		return "Error de Conexion a la DB"
	}
	defer db.Close()
	var consulta = "update  usuario_temporada_membresia set idmembresia=" + id +
		"\n where idusuario=(select idusuario from usuario where usser='" + us + "')" +
		"\n and idtemporada=(select idtemporada from(" +
		"\n select * from usuario_temporada_membresia where usuario_temporada_membresia.idusuario=(" +
		"\n select idusuario from usuario where usser='" + us + "')ORDER BY idtemporada DESC)" +
		"\n WHERE ROWNUM <= 1)"
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return "Error al ejecutar la consulta"
	}
	defer rows.Close()
	return "Consulta Exitosa!"
}
