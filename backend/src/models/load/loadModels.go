package EstructurasLoad

type prediccion struct {
	Visitante string `yaml:"visitante"`
	Local     string `yaml:"local"`
}

type Deporte struct {
	Deporte    string     `yaml:"deporte"`
	Fecha      string     `yaml:"fecha"`
	Visitante  string     `yaml:"visitante"`
	Local      string     `yaml:"local"`
	Prediccion prediccion `yaml:"prediccion"`
	Resultado  prediccion `yaml:"resultado"`
}

type jornada struct {
	Jornada      string    `yaml:"jornada"`
	Predicciones []Deporte `yaml:"predicciones"`
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

type Inicial struct {
	Nombre     string      `yaml:"nombre"`
	Apellido   string      `yaml:"apellido"`
	Password   string      `yaml:"password"`
	Username   string      `yaml:"username"`
	Resultados []temporada `yaml:"resultados"`
}

type Usuario struct {
	U2  Inicial `yaml:"A2"`
	U3  Inicial `yaml:"A3"`
	U4  Inicial `yaml:"A4"`
	U5  Inicial `yaml:"A5"`
	U6  Inicial `yaml:"A6"`
	U7  Inicial `yaml:"A7"`
	U8  Inicial `yaml:"A8"`
	U9  Inicial `yaml:"A9"`
	U10 Inicial `yaml:"A10"`
	U11 Inicial `yaml:"A11"`
	U12 Inicial `yaml:"A12"`
	U13 Inicial `yaml:"A13"`
	U14 Inicial `yaml:"A14"`
	U15 Inicial `yaml:"A15"`
	U16 Inicial `yaml:"A16"`
	U17 Inicial `yaml:"A17"`
	U18 Inicial `yaml:"A18"`
	U19 Inicial `yaml:"A19"`
	U20 Inicial `yaml:"A20"`
	U21 Inicial `yaml:"A21"`
	U22 Inicial `yaml:"A22"`
	U23 Inicial `yaml:"A23"`
	U24 Inicial `yaml:"A24"`
	U25 Inicial `yaml:"A25"`
	U26 Inicial `yaml:"A26"`
	U27 Inicial `yaml:"A27"`
	U28 Inicial `yaml:"A28"`
	U29 Inicial `yaml:"A29"`
	U30 Inicial `yaml:"A30"`
	U31 Inicial `yaml:"A31"`
	U32 Inicial `yaml:"A32"`
	U33 Inicial `yaml:"A33"`
	U34 Inicial `yaml:"A34"`
	U35 Inicial `yaml:"A35"`
	U36 Inicial `yaml:"A36"`
	U37 Inicial `yaml:"A37"`
	U38 Inicial `yaml:"A38"`
	U39 Inicial `yaml:"A39"`
	U40 Inicial `yaml:"A40"`
	U41 Inicial `yaml:"A41"`
	U42 Inicial `yaml:"A42"`
	U43 Inicial `yaml:"A43"`
	U44 Inicial `yaml:"A44"`
	U45 Inicial `yaml:"A45"`
	U46 Inicial `yaml:"A46"`
	U47 Inicial `yaml:"A47"`
	U48 Inicial `yaml:"A48"`
	U49 Inicial `yaml:"A49"`
	U50 Inicial `yaml:"A50"`
	U51 Inicial `yaml:"A51"`
	U52 Inicial `yaml:"A52"`
	U53 Inicial `yaml:"A53"`
	U54 Inicial `yaml:"A54"`
	U55 Inicial `yaml:"A55"`
	U56 Inicial `yaml:"A56"`
	U57 Inicial `yaml:"A57"`
	U58 Inicial `yaml:"A58"`
	U59 Inicial `yaml:"A59"`
	U60 Inicial `yaml:"A60"`
	U61 Inicial `yaml:"A61"`
	U62 Inicial `yaml:"A62"`
	U63 Inicial `yaml:"A63"`
	U64 Inicial `yaml:"A64"`
	U65 Inicial `yaml:"A65"`
	U66 Inicial `yaml:"A66"`
	U67 Inicial `yaml:"A67"`
	U68 Inicial `yaml:"A68"`
	U69 Inicial `yaml:"A69"`
	U70 Inicial `yaml:"A70"`
	U71 Inicial `yaml:"A71"`
}

type Entrada struct {
	Usuarios []Inicial
}
