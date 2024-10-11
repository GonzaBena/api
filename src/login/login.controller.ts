import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { LoginService } from './login.service'
import { User, UserMongoDB } from '../schemas/user'
import { DatabaseService } from '../database/database.service'
import { CryptographyService } from '../cryptography/cryptography.service'
import { AuthService } from '../auth/auth.service'
import { UserDto } from './user.dto'

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
  async generateToken(@Body() user: UserDto) {
    const userExists = await this.db.getUserByEmail(user.email)
    if (!userExists) return { error: "User doesn't exists" }
    return this.auth.login(user)
  }

  @MessagePattern('register')
  async register(@Body() user: UserDto) {
    const userExists = await this.db.getUserByEmail(user.email)
    if (userExists) return { error: 'User already exists' }
    const newUser = user as UserMongoDB

    newUser.password = await this.crypto.encrypt(user.password)
    newUser.created_at = new Date().toISOString()
    newUser.admin = false

    this.db.addUser(user)
    return user
  }
}
