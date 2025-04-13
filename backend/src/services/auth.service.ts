import { Injectable } from "@nestjs/common";
import { readFileSync, writeFileSync } from 'fs';
import { join } from "path";

/* export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
} */

    export class User {
        id: number;
        name: string;
        email: string;
        password: string;
    
        constructor(id: number, name: string, email: string, password: string) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.password = password;
        }
    }

@Injectable()
export class AuthService {
    private readonly dbPath = join(__dirname, '../db/usersDB.json');

    getHello(): string {
        return 'Hello World!';
    }

    getUserByEmail(email: string): User | null {
        const users = this.getAllUsers();
        return users.find(user => user.email === email) || null;
    }

    getAllUsers(): User[] {
        try {
            const data = readFileSync(this.dbPath, 'utf-8');
            return JSON.parse(data) as User[];
        } catch (error) {
            console.error('Error al leer los usuarios:', error);
            return [];
        }
    }

    addUser(newUser: Omit<User, 'id'>): User {
        const users = this.getAllUsers();

        // Validar si el email ya existe
        if (users.some(user => user.email === newUser.email)) {
            throw new Error('El correo electrónico ya está registrado.');
        }

        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const user = { id, ...newUser };
        users.push(user);
        this.saveUsers(users);
        return user;
    }

    private saveUsers(users: User[]): void {
        try {
            writeFileSync(this.dbPath, JSON.stringify(users, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error al guardar los usuarios:', error);
        }
    }
}
