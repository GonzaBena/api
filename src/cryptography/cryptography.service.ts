import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class CryptographyService {
  async encrypt(contrasena: string): Promise<string> {
    const saltRounds = 10 // Número de rondas de "salt" (más alto es más seguro pero más lento)
    const hash = await bcrypt.hash(contrasena, saltRounds)
    return hash
  }

  async decrypt(
    contrasenaIngresada: string,
    hashAlmacenado: string,
  ): Promise<boolean> {
    const coincide = await bcrypt.compare(contrasenaIngresada, hashAlmacenado)
    return coincide
  }
}
