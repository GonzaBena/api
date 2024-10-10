import { Test, TestingModule } from '@nestjs/testing'
import { BusinessController } from './business.controller'
import { BusinessService } from './business.service'

describe('BusinessController', () => {
  let controller: BusinessController
  let service: BusinessService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [BusinessService],
    }).compile()

    controller = module.get<BusinessController>(BusinessController)
    service = module.get<BusinessService>(BusinessService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
