import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { LoginModule } from './login/login.module'
import { BusinessModule } from './business/business.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(3000)

  const login = await NestFactory.createMicroservice<MicroserviceOptions>(
    LoginModule,
    {
      transport: Transport.TCP,
      options: { port: 3001 },
    },
  )

  // Crear microservicio para el módulo de Negocios
  const business = await NestFactory.createMicroservice<MicroserviceOptions>(
    BusinessModule,
    {
      transport: Transport.TCP,
      options: { port: 3002 },
    },
  )

  await login.listen()
  await business.listen()

  console.log('Microservicio de Login escuchando en el puerto 3001')
  console.log('Microservicio de Negocios escuchando en el puerto 3002')
}
bootstrap()
