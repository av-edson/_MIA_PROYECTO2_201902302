package dbLoad

import (
	"database/sql"
	"fmt"
	"strconv"

	"../../funciones"
)

func GetNoUsers() int {
	db, err := sql.Open("godror", "edson/1234@localhost:1521/xe")
	if err != nil {
		fmt.Println(err)
		return 0
	}
	defer db.Close()

	rows, err := db.Query("SELECT COUNT(*) FROM USUARIO")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return 0
	}
	defer rows.Close()
	var resultado string
	for rows.Next() {
		rows.Scan(&resultado)
	}
	intVar, err := strconv.Atoi(resultado)
	if err != nil {
		fmt.Println("Error turn int")
		fmt.Println(err)
		return 0
	}
	return intVar
}

func GetNoDeporte() int {
	db, err := sql.Open("godror", "edson/1234@localhost:1521/xe")
	if err != nil {
		fmt.Println(err)
		return 0
	}
	defer db.Close()

	rows, err := db.Query("SELECT COUNT(*) FROM DEPORTE")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return 0
	}
	defer rows.Close()
	var resultado string
	for rows.Next() {
		rows.Scan(&resultado)
	}
	intVar, err := strconv.Atoi(resultado)
	if err != nil {
		fmt.Println("Error turn int")
		fmt.Println(err)
		return 0
	}
	return intVar
}

func InsertarUsuario(user string, pass string, nombre string, apellido string) {
	db, err := sql.Open("godror", "edson/1234@localhost:1521/xe")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer db.Close()
	pass = funciones.GetMD5Hash(pass)
	var id = strconv.Itoa(GetNoUsers() + 1)

	var consulta = "INSERT INTO USUARIO VALUES(" + id + ",'" + nombre + "','" + apellido + "','" + user + "','" + pass + "',2)"
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	defer rows.Close()
}

func InsertarDeporte(nombreDeporte string) {
	fmt.Println(GetNoDeporte())
}
