import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { DatabaseService } from '@/database/database.service'
import { User } from '@/schemas/user'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly db: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: new ConfigService().get<string>('JWT_SECRET'), // La misma clave que usaste para generar el token
    })
  }

  async validate(payload: User) {
    const result = await this.db.getUserByEmail(payload.email)

    if (!result['_id']) {
      return null
    } else {
      return result
    }
  }
}
