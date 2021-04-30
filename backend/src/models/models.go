package models

type UsuarioModel struct {
	Nombre    string
	Apellido  string
	UsserName string
	Password  string
}

type UserPass struct {
	UsserName string
	Password  string
}

type Mensaje struct {
	Ms    string
	Value bool
}
