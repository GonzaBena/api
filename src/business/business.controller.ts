import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { BusinessService } from './business.service'

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @MessagePattern('hello')
  async hello() {
    console.log('hello')

    return this.businessService.saludo()
  }
}
