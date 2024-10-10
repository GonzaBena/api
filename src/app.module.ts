import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoginModule } from './login/login.module'
import { BusinessModule } from './business/business.module'

@Module({
  imports: [LoginModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
