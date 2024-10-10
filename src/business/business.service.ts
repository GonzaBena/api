import { Injectable } from '@nestjs/common'

@Injectable()
export class BusinessService {
  saludo() {
    return { message: 'Hola Business' }
  }
}
