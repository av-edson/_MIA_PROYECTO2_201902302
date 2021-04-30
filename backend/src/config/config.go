package config

import (
	"database/sql"

	_ "github.com/godror/godror"
)

func SetConection() (*sql.DB, error) {
	return sql.Open("godror", "edson/1234@localhost:1521")
}

func GetPort() string {
	return ":4200"
}
