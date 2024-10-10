import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedJwtToken'), // Mock de la función `sign`
          },
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('JWT generation', () => {
    expect(
      service.login({
        name: 'example',
        email: 'example@example.com',
        password: 'example',
      }),
    ).toBe({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXhhbXBsZSIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiZXhhbXBsZSJ9.ANsS_vWJXS57YvjtCVb0etExy4Gc6tc8WP7fnk5kJW8',
    })
    //   async validateUser(email: string, password: string): Promise<any> {
    //   // Verifica el usuario con el servicio de usuarios
    //   const user = await this.db.getUserByEmail(email)
    //   if (user && this.crypto.decrypt(password, user.password)) {
    //     const { password, ...result } = user
    //     return result
    //   }
    //   return null
    // }
  })
})
