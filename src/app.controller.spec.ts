import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { firstValueFrom, of } from 'rxjs'
import { DatabaseService } from './database/database.service'
import { ObjectId } from 'mongodb'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService
  let db: DatabaseService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, DatabaseService],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)
    db = app.get<DatabaseService>(DatabaseService)
  })

  describe('root', () => {
    it('should return "login"', async () => {
      const observable = await appController.saludoLogin()

      const result = await firstValueFrom(observable)
      console.log('result', result)

      expect(result).toEqual({ message: 'Hola Login' })
    })

    it('should return "gonzo" like a name', async () => {
      db.connect()

      const result = await db.getUser(new ObjectId('670805a425a53d1baba4ecab'))
      db.close()

      expect(result.email).toEqual('string@example.com')
    })
  })
})
