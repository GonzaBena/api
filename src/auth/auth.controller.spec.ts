import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { DatabaseService } from '../database/database.service'
import { JwtService } from '@nestjs/jwt'
import { CryptographyService } from '../cryptography/cryptography.service'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService
  let db: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        DatabaseService,
        {
          provide: CryptographyService,
          useValue: {
            encrypt: jest.fn().mockReturnValue('encryptedData'), // Mock de la función `encrypt`
            decrypt: jest.fn().mockReturnValue('decryptedData'), // Mock de la función `decrypt`
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedJwtToken'), // Mock de la función `sign`
          },
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
    db = module.get<DatabaseService>(DatabaseService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
