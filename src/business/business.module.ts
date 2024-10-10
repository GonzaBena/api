import { Module } from '@nestjs/common'
import { BusinessController } from './business.controller'
import { BusinessService } from './business.service'
import { DatabaseService } from '../database/database.service'

@Module({
  controllers: [BusinessController],
  providers: [BusinessService, DatabaseService],
})
export class BusinessModule {}
