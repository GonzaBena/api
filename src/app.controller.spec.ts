import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { firstValueFrom, of } from 'rxjs'
import { DatabaseService } from './database/database.service'
import { ObjectId } from 'mongodb'
import { JwtService } from '@nestjs/jwt'
import { CryptographyService } from './cryptography/cryptography.service'
import { ConfigModule } from '@nestjs/config'
import { UserDto } from './DTO/user.dto'
import { LoginService } from './login/login.service'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService
  let db: DatabaseService
  let jwt: JwtService
  let crypto: CryptographyService
  const userDto: UserDto = {
    name: 'test',
    email: 'test@example.com',
    password: 'password123',
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env', // Ruta al archivo .env
          isGlobal: true, // Hace que ConfigModule esté disponible en todo el módulo de prueba
        }),
      ],
      controllers: [AppController],
      providers: [
        AppService,
        DatabaseService,
        JwtService,
        CryptographyService,
        LoginService,
      ],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
    db = app.get<DatabaseService>(DatabaseService)
    jwt = app.get<JwtService>(JwtService)
  })

  describe('root', () => {
    it('should return "gonzo" like a name', async () => {
      await db.connect()

      const result = await db.getUser(new ObjectId('670805a425a53d1baba4ecab'))
      await db.close()

      expect(result.email).toEqual('string@example.com')
    })

    it('should call generateToken and return an observable', async () => {
      const result = of({ token: 'jwt-token' })
      jest
        .spyOn(appService, 'sendToMicroservice')
        .mockImplementation(() => Promise.resolve(result))

      expect(
        await firstValueFrom(await appController.generateToken(userDto)),
      ).toEqual({ token: 'jwt-token' })
    })

    it('should call register and return an observable', async () => {
      const result = of({ success: true })
      jest
        .spyOn(appService, 'sendToMicroservice')
        .mockImplementation(() => Promise.resolve(result))

      expect(
        await firstValueFrom(await appController.register(userDto)),
      ).toEqual({
        success: true,
      })
    })

    it('should call getUsers and return an observable', async () => {
      const result = of({ users: [] })
      jest
        .spyOn(appService, 'sendToMicroservice')
        .mockImplementation(() => Promise.resolve(result))
      const result1 = await appController.getUsers(1, 10)
      try {
        await firstValueFrom(await appController.getUsers(1, 10))
      } catch (error) {
        expect(error.message).toEqual('')
      }
    })

    it('should call searchUsers and return an observable', async () => {
      const result = of({ users: [] })
      jest
        .spyOn(appService, 'sendToMicroservice')
        .mockImplementation(() => Promise.resolve(result))

      try {
        await firstValueFrom(await appController.getUsers(1, 10))
      } catch (error) {
        expect(error.message).toEqual('')
      }
    })
  })
})
