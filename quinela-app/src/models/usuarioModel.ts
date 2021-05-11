export interface UsuarioModel{
    Apellido: string,
    Nombre: string,
    Password: string, 
    UsserName: string
}

export interface UserPass{
    UsserName:string,
    Password: string
}

export interface MsReturn{
    Ms:string,
    Value:boolean
}

export interface SPort{
    Nombre:string,
    Color:string,
    Src:string
}

export interface Trigger{
    Username: string,
    Pass: string,
    Nombre: string,
    Apellido: string,
    Correo: string,
    Fecha: string
}

export interface Membresia{
    Username: string,
    Id: string
    Value: boolean
}