package main

import (
	"fmt"
	"log"
	"net/http"

	"../config"
	"../controllers"

	_ "github.com/godror/godror"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenido Gerardo Joto")
}

func main() {

	fmt.Println("servidor iniciado en el puerto " + config.GetPort())
	fmt.Println("Iniciando coneccion a la base de datos...")

	//seteando coneccion con la DB
	config.IniciarDB()

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/", index)
	router.HandleFunc("/hola", controllers.GetP).Methods("GET")
	router.HandleFunc("/usser/login", controllers.ValidarLogin).Methods("POST")
	router.HandleFunc("/usser/changePass", controllers.CambiarPass).Methods("POST")
	router.HandleFunc("/MasiveLoad", controllers.CargaMasiva).Methods("POST")

	// configurando servidor
	//log.Fatal(http.ListenAndServe(config.GetPort(), router))
	log.Fatal(http.ListenAndServe(config.GetPort(), handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(router)))
}
