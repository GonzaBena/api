import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { DatabaseService } from '@/database/database.service'
import { CryptographyService } from '@/cryptography/cryptography.service'
import { AuthService } from '@/auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [LoginController],
  providers: [
    LoginService,
    DatabaseService,
    CryptographyService,
    AuthService,
    JwtService,
  ],
})
export class LoginModule {}
