import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { LoginService } from './login.service'
import { User } from '../schemas/user'
import { DatabaseService } from '../database/database.service'
import { CryptographyService } from '../cryptography/cryptography.service'
import { AuthService } from '../auth/auth.service'

@Controller('')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly db: DatabaseService,
    private readonly crypto: CryptographyService,
    private readonly auth: AuthService,
  ) {}

  @MessagePattern('hello')
  async hello() {
    console.log('hello')

    return this.loginService.saludo()
  }

  @MessagePattern('login')
  async login(@Body() registerDto: { mail: string; password: string }) {
    return this.loginService.login({
      username: registerDto.mail,
      password: registerDto.password,
    })
  }

  @MessagePattern('generateToken')
  async generateToken(@Body() user: User) {
    return this.auth.login(user)
  }

  @MessagePattern('register')
  async register(@Body() user: User) {
    const esEmailValido = (email: string): boolean => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/
      return regex.test(email)
    }
    console.log('user', user)

    if (!esEmailValido(user.email)) {
      return 'Email invalido'
    }

    if (user.password.length < 8)
      return 'The password should be more than 8 characters'

    const userExists = await this.db.getUserByEmail(user.email)
    if (userExists) return 'User already exists'

    const hash = await this.crypto.encrypt(user.password)
    user.password = hash

    this.db.addUser(user)

    return this.loginService.register(user)
  }
}
