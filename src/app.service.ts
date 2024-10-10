import { Injectable } from '@nestjs/common'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  // Método adicional en MultiClientService para enviar mensajes dinámicamente
  async sendToMicroservice(
    host: string,
    port: number,
    pattern: any,
    payload: any,
  ) {
    const client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    })

    // client.connect() // Conectar manualmente antes de usar la conexión
    const result = client.send(pattern, payload)
    console.log('Mensaje enviado al microservicio')

    client.close() // Cerrar la conexión manualmente después de usarla
    return result
  }
}
