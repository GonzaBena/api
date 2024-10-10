import { User } from '@/schemas/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LoginService {
  login(data: { username: string; password: string }) {
    // Lógica de autenticación
    return { message: 'Login exitoso' }
  }

  register(data: User) {
    // Lógica de registro
    return { ...data, created_at: new Date().toUTCString() }
  }

  saludo() {
    return { message: 'Hola Login' }
  }
}
