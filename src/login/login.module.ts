import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { DatabaseService } from '@/database/database.service'
import { CryptographyService } from '@/cryptography/cryptography.service'

@Module({
  controllers: [LoginController],
  providers: [LoginService, DatabaseService, CryptographyService],
})
export class LoginModule {}
