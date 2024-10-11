import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoginModule } from './login/login.module'
import { BusinessModule } from './business/business.module'
import { DatabaseModule } from './database/database.module'
import { CryptographyModule } from './cryptography/cryptography.module'
import { AuthModule } from './auth/auth.module'
import { JwtService } from '@nestjs/jwt'
import { LoginService } from './login/login.service'

@Module({
  imports: [
    LoginModule,
    BusinessModule,
    DatabaseModule,
    CryptographyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, CryptographyModule, LoginService],
})
export class AppModule {}
