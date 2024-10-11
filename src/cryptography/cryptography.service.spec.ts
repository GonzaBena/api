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

    expect(typeof encrypted).toBe('string')
  })

  // decrypt
  it('should decrypt a string', async () => {
    const encrypted = await service.encrypt('1234')
    const decrypted = await service.decrypt('1234', encrypted)
    expect(decrypted).toBe(true)
  })

  // encrypt should return different hashes for different inputs
  it('should return different hashes for different inputs', async () => {
    const encrypted1 = await service.encrypt('1234')
    const encrypted2 = await service.encrypt('abcd')
    expect(encrypted1).not.toBe(encrypted2)
  })

  // encrypt should return different hashes for the same input
  it('should return different hashes for the same input', async () => {
    const encrypted1 = await service.encrypt('1234')
    const encrypted2 = await service.encrypt('1234')
    expect(encrypted1).not.toBe(encrypted2)
  })

  // decrypt should return false for incorrect password
  it('should return false for incorrect password', async () => {
    const encrypted = await service.encrypt('1234')
    const decrypted = await service.decrypt('wrongpassword', encrypted)
    expect(decrypted).toBe(false)
  })
})
