package models

type UsuarioModel struct {
	Nombre    string
	Apellido  string
	UsserName string
	Password  string
}

type Trigger struct {
	Username string
	Pass     string
	Nombre   string
	Apellido string
	Correo   string
	Fecha    string
}

type UserPass struct {
	UsserName string
	Password  string
}

type Mensaje struct {
	Ms    string
	Value bool
}

type Deporte struct {
	Nombre string
	Color  string
	Src    string
}
