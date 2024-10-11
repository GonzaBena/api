import { Test, TestingModule } from '@nestjs/testing'
import { CryptographyService } from './cryptography.service'
import { CryptographyController } from './cryptography.controller'

describe('CryptographyService', () => {
  let service: CryptographyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptographyService, CryptographyController],
    }).compile()

    service = module.get<CryptographyService>(CryptographyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // encrypt
  it('should encrypt a string', async () => {
    const encrypted = await service.encrypt('1234')
    expect(encrypted).toBeInstanceOf(String)
  })

  // decrypt
  it('should decrypt a string', async () => {
    const encrypted = await service.encrypt('1234')
    const decrypted = await service.decrypt('1234', encrypted)
    expect(decrypted).toBe(true)
  })
})
