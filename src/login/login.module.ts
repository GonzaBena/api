import { Module } from '@nestjs/common'
import { LoginController, RegisterController } from './login.controller'
import { LoginService } from './login.service'

@Module({
  controllers: [LoginController, RegisterController],
  providers: [LoginService],
})
export class LoginModule {}
