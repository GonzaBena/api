import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { firstValueFrom, of } from 'rxjs'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "login"', async () => {
      const observable = await appController.saludoLogin()

      const result = await firstValueFrom(observable)
      console.log('result', result)

      expect(result).toEqual({ message: 'Hola Login' })
    })

    it('should return "business"', async () => {
      const observable = await appController.saludoBusiness()

      const result = await firstValueFrom(observable)
      console.log('result', result)

      expect(result).toEqual({ message: 'Hola Business' })
    })
  })
})
