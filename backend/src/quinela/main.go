package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"../config"
	"../controllers"

	_ "github.com/godror/godror"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func index(w http.ResponseWriter, r *http.Request) {
	///home/edson/Descargas/quinielas.yaml
	file, err := os.Open("/home/edson/Descargas/quinielas.yaml")
	//file, err := os.Open("/home/edson/Escritorio/pequeno.yaml")
	if err != nil {
		fmt.Println("-----------------------------------------------------")
		log.Fatal(err)
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	noUsuario := 2
	contenido := ""
	for scanner.Scan() {
		var linea string = scanner.Text()
		ll := string(linea)
		esLineaIicio := strings.Index(ll, "A"+strconv.Itoa(noUsuario))
		if esLineaIicio != -1 {
			ll = strings.Replace(ll, ":", "", -1)
			ll = strings.Replace(ll, "A", "Usser: A", -1)
			noUsuario++
		}
		contenido += ll + "\n"

	}
	bits := []byte(contenido)
	err = ioutil.WriteFile("/home/edson/Escritorio/salida.yaml", bits, 0644)
	if err != nil {
		log.Fatal(err)
	}
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
	router.HandleFunc("/usser/login", controllers.ValidarLogin).Methods("POST") // validar login
	router.HandleFunc("/getUserData", controllers.GetUserData).Methods("POST")  // obtener datos despues del login
	router.HandleFunc("/usser/changePass", controllers.CambiarPass).Methods("POST")
	router.HandleFunc("/MasiveLoad", controllers.CargaMasiva).Methods("POST")
	router.HandleFunc("/GetDeportes", controllers.GetDeportes).Methods("GET")
	router.HandleFunc("/RegistrarUsuario", controllers.RegistroTrigger).Methods("POST")

	// configurando servidor
	//log.Fatal(http.ListenAndServe(config.GetPort(), router))
	log.Fatal(http.ListenAndServe(config.GetPort(), handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(router)))
}
