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
import { User } from './schemas/user'
import { JwtAuthGuard } from './auth/jwt/jwt.guard'
import { UserDto } from './login/user.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  // ENDPOINT 2
  // aqui el usuario vuelve a cargar los datos de registro ingresados en el endpoint 1
  @Post('generate-token')
  async generateToken(@Body() req: UserDto): Promise<Observable<any>> {
    return this.appService.sendToMicroservice(
      'localhost',
      3001,
      'generateToken',
      req,
    )
  }

  // ENDPOINT 1
  @Post('register')
  async register(@Body() req: UserDto): Promise<Observable<any>> {
    return this.appService.sendToMicroservice(
      'localhost',
      3001,
      'register',
      req,
    )
  }

  // ENDPOINT 3
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

  // ENDPOINT 3.1
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
}
