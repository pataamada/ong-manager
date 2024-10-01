export interface User {
    name: string
    cpf: string
    role: string
    email: string
    password: string | undefined
    uid: string
    photo: string
    birthDate: Date
    phone: string
}