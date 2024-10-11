import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { AppService } from './app.service'
import { Observable } from 'rxjs'
import { JwtAuthGuard } from './auth/jwt/jwt.guard'
import { UserDto } from './DTO/user.dto'
import { LoginService } from './login/login.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly login: LoginService,
  ) {}

  /**
   *  ENDPOINT 1
   * Al usar el UserDto, se valida que los datos enviados en el body sean correctos
   */
  @Post('register')
  async register(@Body() req: UserDto): Promise<Observable<any>> {
    try {
      return this.appService.sendToMicroservice(
        'localhost',
        3001,
        'register',
        req,
      )
    } catch (error) {
      console.error('Error in /register:', error)
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
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

  /**
   *  ENDPOINT 3
   * El Guard aceptara cualquier token que sea valido osea que no este expirado.
   * para cambiar esto se debe modificar el archivo jwt.guard.ts
   */
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Observable<any>> {
    return this.login.sendToBusiness('users', {
      page,
      limit,
    })
  }

  // ENDPOINT 3.1
  @UseGuards(JwtAuthGuard)
  @Get('users/search')
  async searchUsers(
    @Query('email') email: string = '',
  ): Promise<Observable<any>> {
    return this.login.sendToBusiness('search', {
      email,
    })
  }
}
