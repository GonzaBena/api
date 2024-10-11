import { User } from '../schemas/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LoginService {
  login(data: { username: string; password: string }) {
    // Lógica de autenticación
    return { message: 'Login exitoso' }
  }

  saludo() {
    return { message: 'Hola Login' }
  }

  generateToken(user: User) {
    // Generar token
    return { token: '' }
  }
}
