export enum UserRoles {
    Admin = 'ADMIN',
    Authenticated = 'AUTHENTICATED'
}
export interface User {
    name: string;
    cpf: string;
    role: UserRoles;
    email: string;
    uid: string;
    photo: string;
    birthDate: Date;
    phone: string;
}
