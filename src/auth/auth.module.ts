import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { DatabaseService } from '../database/database.service'
import { JwtStrategy } from './jwt.strategy'
import { CryptographyService } from '../cryptography/cryptography.service'

@Module({
  imports: [
    ConfigModule.forRoot(), // Importa el módulo de configuración
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    DatabaseService,
    CryptographyService,
    JwtService,
  ],
  exports: [AuthService],
})
export class AuthModule {
  constructor(private readonly authService: AuthService) {}
}
