import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('login')
  async login() {
    return this.appService.sendToMicroservice('localhost', 3001, 'login', {
      mail: 'usuario@example.com',
      password: 'password123',
    })
  }

  @Post('register')
  async register() {
    return this.appService.sendToMicroservice('localhost', 3001, 'register', {
      mail: 'usuario@example.com',
      password: 'password123',
    })
  }
}
