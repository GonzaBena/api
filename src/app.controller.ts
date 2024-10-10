import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common'
import { AppService } from './app.service'
import { Observable } from 'rxjs'
import { DatabaseService } from './database/database.service'
import { User } from '@schemas/user'
import { JwtAuthGuard } from './auth/jwt/jwt.guard'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly db: DatabaseService,
  ) {}

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

  @Post('generate-token')
  async generateToken(@Body() req: User): Promise<Observable<any>> {
    console.log('req', req)

    return this.appService.sendToMicroservice(
      'localhost',
      3001,
      'generateToken',
      req,
    )
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers(
    @Req() req: { user: User },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Observable<any>> {
    console.log('req', req.user)
    console.log('page', page)
    console.log('limit', limit)
    return this.appService.sendToMicroservice('localhost', 3002, 'users', {
      page,
      limit,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/search')
  async searchUsers(
    @Req() req: { user: User },
    @Query('email') email: string = '',
  ): Promise<Observable<any>> {
    return this.appService.sendToMicroservice('localhost', 3002, 'search', {
      email,
    })
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
