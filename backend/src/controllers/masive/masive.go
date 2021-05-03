package masive

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"strconv"

	//"strconv"
	"strings"

	EstructurasLoad "../../models/load"
	"../funciones"
	"./dbLoad"

	"gopkg.in/yaml.v2"
)

func readConf(filename string) (EstructurasLoad.Datos, error) {
	c := EstructurasLoad.Datos{}

	buf, err := ioutil.ReadFile(filename)
	if err != nil {
		return c, err
	}

	err = yaml.Unmarshal(buf, &c)
	if err != nil {
		return c, fmt.Errorf("in file %q: %v", filename, err)
	}

	return c, nil
}

//func read(path string) {
//	file, err := os.Open(path)
//	if err != nil {
//		log.Fatal(err)
//	}
//	defer file.Close()
//	scanner := bufio.NewScanner(file)
//	for scanner.Scan() {
//		fmt.Println(scanner.Text())
//	}
//}

func Cargar(path string) bool {
	c, err := readConf(path)
	if err != nil {
		fmt.Println("hubo error xd")
	}
	db, err := sql.Open("godror", "edson/1234@localhost:1521/xe")
	if err != nil {
		fmt.Println(err)
		return false
	}
	defer db.Close()
	ingresarDatos(c, db)
	//read(path)
	return true
}

func ingresarDatos(c EstructurasLoad.Datos, db *sql.DB) {
	dbLoad.InsertarUsuario(c.Inicial.Username, funciones.GetMD5Hash(c.Inicial.Password), c.Inicial.Nombre, c.Inicial.Apellido)
	for _, temporada := range c.Inicial.Resultados {
		meterTemporada(temporada.Temporada, db)
		meterMembresiaUsuario(c.Inicial.Username, temporada.Tier, temporada.Temporada, db)
		for _, jornada := range temporada.Jornadas {
			if meterJornada(jornada.Jornada, temporada.Temporada, db) {
				for _, deporte := range jornada.Predicciones {
					meterDeporte(deporte.Deporte, db)
					meterEvento(temporada.Temporada, jornada.Jornada, deporte.Deporte, deporte.Local, deporte.Visitante, deporte.Resultado.Local, deporte.Resultado.Visitante, db)
					meterPrediccion(deporte, temporada.Temporada, jornada.Jornada, c.Inicial.Username, db)
				}
			}
		}

	}
}

func meterTemporada(nombre string, db *sql.DB) {
	res := dbLoad.VerificarEnTabla(nombre, 2, db)
	if res != 0 {
		return
	} else {
		fechaInicio, fechaFin := getFechas(nombre)
		dbLoad.InsertarTemporada(nombre, fechaInicio, fechaFin, db)
	}
}

func meterDeporte(nombre string, db *sql.DB) {
	res := dbLoad.VerificarEnTabla(nombre, 1, db)
	if res != 0 {
		return
	} else {
		//fmt.Println(nombre)
		dbLoad.InsertarDeporte(nombre, db)
	}
}

func meterMembresiaUsuario(userName string, membresia string, temporada string, db *sql.DB) {
	aux := "SELECT IDTEMPORADA FROM TEMPORADA WHERE NOMBRE='" + temporada + "'"
	idTemporada := dbLoad.Consulta(aux, db)
	aux = "SELECT IDUSUARIO FROM USUARIO WHERE USSER='" + userName + "'"
	idUsuario := dbLoad.Consulta(aux, db)
	idMemebresia := "1"
	switch membresia {
	case "bronze":
		idMemebresia = "3"
	case "silver":
		idMemebresia = "2"
	case "gold":
		idMemebresia = "1"
	}
	aux = "INSERT INTO USUARIO_TEMPORADA_MEMBRESIA VALUES(" + idTemporada + "," + idMemebresia + "," + idUsuario + ",0)"
	dbLoad.ConsultaSinRegreso(aux, db)
}

func getFechas(nombreTemporada string) (string, string) {
	fechaInicio := ""
	fechaFin := ""
	temp := strings.Split(nombreTemporada, "-")
	noMes := temp[1]
	noMes = noMes[1:]
	switch noMes {
	case "1":
		fechaInicio = "01/01/" + temp[0]
		fechaFin = "31/01/" + temp[0]
	case "2":
		fechaInicio = "01/02/" + temp[0]
		fechaFin = "28/02/" + temp[0]
	case "3":
		fechaInicio = "01/03/" + temp[0]
		fechaFin = "31/03/" + temp[0]
	case "4":
		fechaInicio = "01/04/" + temp[0]
		fechaFin = "30/04/" + temp[0]
	case "5":
		fechaInicio = "01/05/" + temp[0]
		fechaFin = "31/05/" + temp[0]
	case "6":
		fechaInicio = "01/06/" + temp[0]
		fechaFin = "30/06/" + temp[0]
	case "7":
		fechaInicio = "01/07/" + temp[0]
		fechaFin = "31/07/" + temp[0]
	case "8":
		fechaInicio = "01/08/" + temp[0]
		fechaFin = "31/08/" + temp[0]
	case "9":
		fechaInicio = "01/09/" + temp[0]
		fechaFin = "30/09/" + temp[0]
	case "10":
		fechaInicio = "01/10/" + temp[0]
		fechaFin = "31/10/" + temp[0]
	case "11":
		fechaInicio = "01/11/" + temp[0]
		fechaFin = "30/11/" + temp[0]
	default:
		fechaInicio = "01/12/" + temp[0]
		fechaFin = "31/12/" + temp[0]
	}
	return fechaInicio, fechaFin
}

func meterJornada(jornada string, temporada string, db *sql.DB) bool {
	aux := "SELECT IDTEMPORADA FROM TEMPORADA WHERE NOMBRE='" + temporada + "'"
	idTemporada := dbLoad.Consulta(aux, db)
	id := strconv.Itoa(dbLoad.GetId(4, db) + 1)
	fechaInicio, fechaFin := getFechas(temporada)
	aux = "INSERT INTO JORNADA VALUES(" + id + ",TO_DATE('" + fechaInicio + "','DD-MM-RR')" + ",TO_DATE('" + fechaFin + "','DD-MM-RR')," + idTemporada + ",3,'" + jornada + "')"
	dbLoad.ConsultaSinRegreso(aux, db)
	return true
}

func meterEvento(temporada string, jornada string, deporte string, local string, visitante string, puntosLocal string, puntosVisita string, db *sql.DB) {
	//fmt.Println(jornada + " - " + deporte + " - " + local + " - " + visitante + " - " + puntosLocal + " - " + puntosVisita)
	idEvento := strconv.Itoa(dbLoad.GetId(5, db) + 1)
	idTemporada := dbLoad.Consulta("SELECT IDTEMPORADA FROM TEMPORADA WHERE NOMBRE='"+temporada+"'", db)
	idJornada := dbLoad.Consulta("SELECT IDJORNADA FROM JORNADA WHERE IDTEMPORADA="+idTemporada+" AND NOMBRE='"+jornada+"'", db)
	idDeporte := dbLoad.Consulta("SELECT IDDEPORTE FROM DEPORTE WHERE DESCRIPCION='"+deporte+"'", db)
	consulta := "INSERT INTO EVENTO VALUES(" + idEvento + ",'" + local + "','" + visitante + "'," + puntosLocal + "," + puntosVisita + "," + idJornada + "," + idDeporte + ")"
	// fmt.Println(consulta)
	dbLoad.ConsultaSinRegreso(consulta, db)
}

func meterPrediccion(deporte EstructurasLoad.Deporte, temporada string, jornada string, use string, db *sql.DB) {
	idTemporada := dbLoad.Consulta("SELECT IDTEMPORADA FROM TEMPORADA WHERE NOMBRE='"+temporada+"'", db)
	idJornada := dbLoad.Consulta("SELECT IDJORNADA FROM JORNADA WHERE IDTEMPORADA="+idTemporada+" AND NOMBRE='"+jornada+"'", db)
	consulta := "SELECT IDEVENTO FROM EVENTO WHERE IDJORNADA=" + idJornada + " AND ELOCAL='" + deporte.Local + "' AND EVISITANTE='" + deporte.Visitante + "' AND PREDICCIONLOCALFIN=" + deporte.Resultado.Local + " AND PREDICCIONVISITANTEFIN=" + deporte.Resultado.Visitante
	idEvento := dbLoad.Consulta(consulta, db)
	idUsuario := dbLoad.Consulta("SELECT IDUSUARIO FROM USUARIO WHERE USSER='"+use+"'", db)
	idPrediccion := strconv.Itoa(dbLoad.GetId(6, db) + 1)
	consulta = "INSERT INTO PREDICCION VALUES(" + idPrediccion + "," + idEvento + "," + idUsuario + "," + deporte.Resultado.Local + "," + deporte.Resultado.Visitante + ")"
	//fmt.Println(consulta)
	dbLoad.Consulta(consulta, db)
	//idEvento := dbLoad.Consulta("SELECT IDEVENTO FROM EVENTO WHERE",db)
}
