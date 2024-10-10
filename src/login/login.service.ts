import { Injectable } from '@nestjs/common'

@Injectable()
export class LoginService {
  login(data: { username: string; password: string }) {
    // Lógica de autenticación
    return { message: 'Login exitoso' }
  }

  register(data: { username: string; password: string }) {
    // Lógica de registro
    return { message: 'Registro exitoso' }
  }
}
