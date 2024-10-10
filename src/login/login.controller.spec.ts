import { Test, TestingModule } from '@nestjs/testing'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'

describe('LoginController', () => {
  let loginController: LoginController
  let loginService: LoginService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile()

    loginService = module.get<LoginService>(LoginService)
    loginController = module.get<LoginController>(LoginController)
  })

  it('should be defined', () => {
    expect(loginController).toBeDefined()
  })
})
