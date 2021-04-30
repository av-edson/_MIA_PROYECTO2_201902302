package EstructurasLoad

type prediccion struct {
	Visitante string `yaml:"visitante"`
	Local     string `yaml:"local"`
}

type deporte struct {
	Deporte    string     `yaml:"deporte"`
	Fecha      string     `yaml:"fecha"`
	Visitante  string     `yaml:"visitante"`
	Local      string     `yaml:"local"`
	Prediccion prediccion `yaml:"prediccion"`
	Resultado  prediccion `yaml:"resultado"`
}

type jornada struct {
	Jornada      string    `yaml:"jornada"`
	Predicciones []deporte `yaml:"predicciones"`
}

type temporada struct {
	Temporada string    `yaml:"temporada"`
	Tier      string    `yaml:"tier"`
	Jornadas  []jornada `yaml:"jornadas"`
}

type Datos struct {
	Inicial struct {
		Nombre     string      `yaml:"nombre"`
		Apellido   string      `yaml:"apellido"`
		Password   string      `yaml:"password"`
		Username   string      `yaml:"username"`
		Resultados []temporada `yaml:"resultados"`
	} `yaml:"A2"`
}
