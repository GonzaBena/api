import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { Observable } from 'rxjs'
import { DatabaseService } from './database/database.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly db: DatabaseService,
  ) {}

  @Post('saludo-business')
  async saludoBusiness(): Promise<Observable<any>> {
    this.db.connect()
    return await this.appService.sendToMicroservice(
      'localhost',
      3002,
      'hello',
      {
        mail: 'usuario@example.com',
        password: 'password123',
      },
    )
  }

  @Post('saludo-login')
  async saludoLogin(): Promise<Observable<any>> {
    return await this.appService.sendToMicroservice(
      'localhost',
      3001,
      'hello',
      {
        mail: 'usuario@example.com',
        password: 'password123',
      },
    )
  }

  @Post('login')
  async login(): Promise<Observable<any>> {
    return await this.appService.sendToMicroservice(
      'localhost',
      3001,
      'login',
      {
        mail: 'usuario@example.com',
        password: 'password123',
      },
    )
  }

  @Post('register')
  async register(): Promise<Observable<any>> {
    return this.appService.sendToMicroservice('localhost', 3001, 'register', {
      mail: 'usuario@example.com',
      password: 'password123',
    })
  }
}
