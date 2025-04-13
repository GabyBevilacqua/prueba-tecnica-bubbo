import { Controller, Get, Post, Body, Param, NotFoundException, Res,BadRequestException  } from "@nestjs/common";
import { Response } from "express";
import { AuthService, User } from "src/services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getHello(): string {
        return this.authService.getHello();
    }

    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
        const user = this.authService.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return user;
    }

    @Post('login')
    authByEmail(@Body() body: { email: string; password: string }, @Res() res: Response) {
        const { email, password } = body;
    
        if (!email || !password) {
            throw new NotFoundException('Email y contraseña son requeridos.');
        }
    
        const user = this.authService.getUserByEmail(email);
        if (!user || user.password !== password) {
            throw new NotFoundException('Credenciales inválidas');
        }
        
        res.cookie('auth', JSON.stringify({ email, password }), {
            httpOnly: true,
            maxAge: 3600 * 1000,
        });

        // Devolver la respuesta con el usuario
        return res.send({ message: 'Autenticación exitosa', user });
    }

    @Post('signUp')
    signUp(@Body() body: { email: string; name: string; password: string }):User {
        const { email, name, password } = body;
    
        if (!email || !name || !password) {
            throw new NotFoundException('Todos los campos son requeridos.');
        }
    
        return this.authService.addUser(body);
    }
}
