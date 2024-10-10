// auth.controller.ts
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt/jwt.guard'
import { User } from '../schemas/user'
import { MessagePattern } from '@nestjs/microservices'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req: { body: User }) {
    // Supón que el cuerpo de la solicitud tiene { email, password }
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    )
    if (!user) {
      return { message: 'Usuario o contraseña incorrectos' }
    }
    return this.authService.login(user)
  }

  @Get('profile')
  getProfile(@Request() req: { body: User }) {
    return req.body
  }

  @MessagePattern('create')
  async create(@Body() req: User) {
    return this.authService.login(req)
  }
}
