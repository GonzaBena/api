import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../auth.service'
import { JwtService } from '@nestjs/jwt'
import { DatabaseService } from '../../database/database.service'
import { CryptographyService } from '../../cryptography/cryptography.service'

describe('AuthService', () => {
  let service: AuthService
  let jwtService: JwtService
  let dbService: DatabaseService
  let cryptoService: CryptographyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedJwtToken'),
          },
        },
        {
          provide: DatabaseService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue({
              email: 'example@example.com',
              password: 'encryptedPassword',
            }),
          },
        },
        {
          provide: CryptographyService,
          useValue: {
            decrypt: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
    dbService = module.get<DatabaseService>(DatabaseService)
    cryptoService = module.get<CryptographyService>(CryptographyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should generate JWT token', async () => {
    const result = await service.login({
      name: 'example',
      email: 'example@example.com',
      password: 'example',
    })
    expect(result).toEqual({ access_token: 'mockedJwtToken' })
  })

  it('should validate user with correct credentials', async () => {
    const user = await service.validateUser('example@example.com', 'example')
    expect(dbService.getUserByEmail).toHaveBeenCalledWith('example@example.com')
    expect(cryptoService.decrypt).toHaveBeenCalledWith(
      'example',
      'encryptedPassword',
    )
    expect(user).toEqual({ email: 'example@example.com' })
  })

  it('should return null for invalid credentials', async () => {
    jest.spyOn(cryptoService, 'decrypt').mockResolvedValueOnce(false)
    const user = await service.validateUser(
      'example@example.com',
      'wrongPassword',
    )
    expect(user).toBeNull()
  })
})
