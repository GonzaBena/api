import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { User } from '../schemas/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LoginService {
  async sendToBusiness(pattern: any, payload: any) {
    const client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002,
      },
    })

    // client.connect() // Conectar manualmente antes de usar la conexión
    const result = client.send(pattern, {
      ...payload,
      headers: { 'x-api-key': 'login' }, // Encabezado personalizado para que solo el microservicio de login pueda acceder a los datos de business
    })

    client.close() // Cerrar la conexión manualmente después de usarla
    return result
  }
}
