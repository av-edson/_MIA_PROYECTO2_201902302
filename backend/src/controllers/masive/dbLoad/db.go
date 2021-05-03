package dbLoad

import (
	"database/sql"
	"fmt"
	"strconv"
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

// ejecutar consulta simple
func Consulta(consulta string, db *sql.DB) string {
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		defer rows.Close()
		return ""
	}
	defer rows.Close()
	var resultado string
	for rows.Next() {
		rows.Scan(&resultado)
	}
	return resultado
}

func ConsultaSinRegreso(consulta string, db *sql.DB) {
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		defer rows.Close()
		return
	}
	defer rows.Close()
}

// para obtener los ides
func GetId(tipo int, db *sql.DB) int {
	var consulta = ""
	switch tipo {
	case 1:
		consulta = "SELECT COUNT(*) FROM DEPORTE"
	case 2:
		consulta = "SELECT COUNT(*) FROM TEMPORADA"
	case 3:
		consulta = "SELECT COUNT(*) FROM USUARIO_TEMPORADA_MEMBRESIA"
	case 4:
		consulta = "SELECT COUNT(*) FROM JORNADA"
	case 5:
		consulta = "SELECT COUNT(*) FROM EVENTO"
	case 6:
		consulta = "SELECT COUNT(*) FROM PREDICCION"

	}
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		defer rows.Close()
		return -1
	} else {
		defer rows.Close()
		var resultado string
		for rows.Next() {
			rows.Scan(&resultado)
		}
		intVar, err := strconv.Atoi(resultado)
		if err != nil {
			fmt.Println("Error turn int")
			fmt.Println(err)
			return -1
		}
		return intVar
	}
}

// 1=deporte,2=temporada
func VerificarEnTabla(nombre string, tipo int, db *sql.DB) int {
	var consulta = ""
	switch tipo {
	case 1:
		consulta = "SELECT COUNT(*) FROM DEPORTE WHERE DESCRIPCION='" + nombre + "'"
	case 2:
		consulta = "SELECT COUNT(*) FROM TEMPORADA WHERE NOMBRE='" + nombre + "'"

	}
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return 1
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
		return 1
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

func InsertarDeporte(nombreDeporte string, db *sql.DB) {
	if GetId(1, db) == -1 {
		return
	}
	var id = strconv.Itoa(GetId(1, db) + 1)
	var consulta = "INSERT INTO DEPORTE VALUES(" + id + ",'" + nombreDeporte + "')"
	ConsultaSinRegreso(consulta, db)
	//rows, err := db.Query(consulta)
	//if err != nil {
	//	fmt.Println("Error running query")
	//	fmt.Println(err)
	//	return
	//}
	//defer rows.Close()
}

func InsertarTemporada(nombre string, fechaInicio string, fechaFin string, db *sql.DB) {
	if GetId(2, db) == -1 {
		return
	}
	var id = strconv.Itoa(GetId(2, db) + 1)
	var consulta = "INSERT INTO TEMPORADA VALUES(" + id + ",TO_DATE('" + fechaInicio + "','DD-MM-RR'),TO_DATE('" + fechaFin + "','DD-MM-RR'),'" + nombre + "')"
	//fmt.Println(consulta)
	rows, err := db.Query(consulta)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	defer rows.Close()
}
