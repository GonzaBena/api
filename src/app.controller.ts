import { Controller, Get, Post, Body } from '@nestjs/common'
import { AppService } from './app.service'
import { Observable } from 'rxjs'
import { DatabaseService } from './database/database.service'
import { ObjectId } from 'mongodb'
import { User } from '@schemas/user'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly db: DatabaseService,
  ) {}

  @Post('saludo-login')
  async saludoLogin(): Promise<Observable<any>> {
    await this.db.connect()
    console.log('usuarios: ', await this.db.getUsers())
    console.log(
      'usuarios: ',
      await this.db.getUser(new ObjectId('670805a425a53d1baba4ecab')),
    )
    await this.db.close()
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
  async register(@Body() req: User): Promise<Observable<any>> {
    return this.appService.sendToMicroservice(
      'localhost',
      3001,
      'register',
      req,
    )
  }
}
