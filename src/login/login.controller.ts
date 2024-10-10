import { Controller, Post, Body } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { LoginService } from './login.service'

@Controller('')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @MessagePattern('login')
  async login(@Body() registerDto: { mail: string; password: string }) {
    console.log('login')

    return this.loginService.login({
      username: registerDto.mail,
      password: registerDto.password,
    })
  }

  @MessagePattern('register')
  async register(@Body() registerDto: { mail: string; password: string }) {
    console.log('register')

    return this.loginService.register({
      username: registerDto.mail,
      password: registerDto.password,
    })
  }
}
