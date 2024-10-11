import { Controller, UseInterceptors } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { BusinessService } from './business.service'
import { DatabaseService } from '../database/database.service'
import { BusinessInterceptor } from './business.interceptor'

@Controller('business')
@UseInterceptors(BusinessInterceptor)
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly db: DatabaseService,
  ) {}

  @MessagePattern('users')
  async users({ page, limit }: { page: number; limit: number }) {
    return this.db.getUsers(page, limit)
  }

  @MessagePattern('search')
  async searchUser({ email }: { email: string }) {
    return this.db.getUserByEmail(email)
  }
}
