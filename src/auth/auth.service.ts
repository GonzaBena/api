import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { DatabaseService } from '../database/database.service'
import { CryptographyService } from '../cryptography/cryptography.service'
import { User } from '../schemas/user'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly crypto: CryptographyService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Verifica el usuario con el servicio de usuarios
    const user = await this.db.getUserByEmail(email)
    if (user && this.crypto.decrypt(password, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(user, {
        secret: new ConfigService().get<string>('JWT_SECRET'),
      }),
    }
  }
}
