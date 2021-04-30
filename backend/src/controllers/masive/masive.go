package masive

import (
	"fmt"
	"io/ioutil"

	EstructurasLoad "../../models/load"

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
	meterUsuario(c)
	//read(path)
	return true
}

func meterUsuario(c EstructurasLoad.Datos) {
	//dbLoad.InsertarUsuario(c.Inicial.Username, c.Inicial.Password, c.Inicial.Nombre, c.Inicial.Apellido)
	for _, temporada := range c.Inicial.Resultados {
		fmt.Println(temporada.Temporada)
	}
	//dbLoad.InsertarDeporte("fut")
}
