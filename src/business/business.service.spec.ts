import { Test, TestingModule } from '@nestjs/testing'
import { BusinessService } from './business.service'
import { BusinessController } from './business.controller'
import { DatabaseService } from '../database/database.service'

describe('BusinessService', () => {
  let service: BusinessService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessService, BusinessController, DatabaseService],
    }).compile()

    service = module.get<BusinessService>(BusinessService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
