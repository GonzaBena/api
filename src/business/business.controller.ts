import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { BusinessService } from './business.service'
import { DatabaseService } from '@/database/database.service'

@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly db: DatabaseService,
  ) {}

  @MessagePattern('hello')
  async hello() {
    console.log('hello')

    return this.businessService.saludo()
  }

  @MessagePattern('users')
  async users({ page, limit }: { page: number; limit: number }) {
    return this.db.getUsers(page, limit)
  }

  @MessagePattern('search')
  async searchUser({ email }: { email: string }) {
    return this.db.getUserByEmail(email)
  }
}
