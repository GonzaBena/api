// cliente.service.ts
import { Injectable } from '@nestjs/common'
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices'

@Injectable()
export class ClientService {
  private loginClient: ClientProxy
  private businessClient: ClientProxy

  constructor() {
    // Configuración del cliente para el microservicio de Login
    this.loginClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3000,
      },
    })

    // Configuración del cliente para el microservicio de Negocios
    this.businessClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    })
  }

  // Método para enviar un mensaje al microservicio de Login
  async sendToLogin(pattern: any, payload: any) {
    return this.loginClient.send(pattern, payload)
  }

  // Método para enviar un mensaje al microservicio de Negocios
  async sendToBusiness(pattern: any, payload: any) {
    return this.businessClient.send(pattern, payload)
  }
}
