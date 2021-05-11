package config

import (
	"database/sql"
	"fmt"

	_ "github.com/godror/godror"
)

func SetConection() (*sql.DB, error) {
	return sql.Open("godror", "edson/1234@localhost:1521")
}

func IniciarDB() {
	db, err := SetConection()
	if err != nil {
		fmt.Println(err)
		return
	} else {
		fmt.Println("Conexion exitosa!!")
	}
	defer db.Close()

	// vaciando la tablas necesarisas
	rows, err := db.Query("DELETE FROM MENSAJE")
	if err != nil {
		fmt.Println("Error running query vaciado tablas")
		fmt.Println(err)
		return
	}
	defer rows.Close()
	rows, err = db.Query("DELETE FROM USUARIO_TEMPORADA_MEMBRESIA")
	if err != nil {
		fmt.Println("Error running query vaciado tablas")
		fmt.Println(err)
		return
	}
	defer rows.Close()
	rows, err = db.Query("DELETE FROM PREDICCION")
	if err != nil {
		fmt.Println("Error running query vaciado tablas")
		fmt.Println(err)
		return
	}
	defer rows.Close()
	rows, err = db.Query("DELETE FROM USUARIO")
	if err != nil {
		fmt.Println("Error running query vaciado tablas")
		fmt.Println(err)
		return
	}
	defer rows.Close()
	rows, err = db.Query("DELETE FROM EVENTO")
	if err != nil {
		fmt.Println("Error running query vaciado tablas")
		fmt.Println(err)
		return
	}
	defer rows.Close()
	rows, err = db.Query("DELETE FROM DEPORTE")
	if err != nil {
		fmt.Println("Error running query vaciado tablas")
		fmt.Println(err)
		return
	}
	defer rows.Close()
	rows, err = db.Query("DELETE FROM JORNADA")
	if err != nil {
		fmt.Println("Error running query vaciado tablas")
		fmt.Println(err)
		return
	}
	defer rows.Close()
	rows, err = db.Query("DELETE FROM TEMPORADA")
	if err != nil {
		fmt.Println("Error running query vaciado tablas")
		fmt.Println(err)
		return
	}
	defer rows.Close()
	db.Query("INSERT INTO USUARIO VALUES(1,'edson','avila','av.edson','81dc9bdb52d04dc20036dbd8313ed055',1)")
	db.Query("DELETE FROM USUARIO_TRIGGER")
}

func GetPort() string {
	return ":4200"
}
