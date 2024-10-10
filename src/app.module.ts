import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoginModule } from './login/login.module'
import { BusinessModule } from './business/business.module'
import { DatabaseService } from './database/database.service'
import { DatabaseModule } from './database/database.module'
import { CryptographyModule } from './cryptography/cryptography.module'

@Module({
  imports: [LoginModule, BusinessModule, DatabaseModule, CryptographyModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
