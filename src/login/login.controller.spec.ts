import { Test, TestingModule } from '@nestjs/testing'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { DatabaseService } from '../database/database.service'

describe('LoginController', () => {
  let loginController: LoginController
  let loginService: LoginService
  let databaseService: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService, DatabaseService],
    }).compile()

    loginService = module.get<LoginService>(LoginService)
    loginController = module.get<LoginController>(LoginController)
    databaseService = module.get<DatabaseService>(DatabaseService)
  })

  it('should be defined', () => {
    expect(loginController).toBeDefined()
  })
})
