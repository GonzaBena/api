import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { LoginModule } from './login/login.module'
import { BusinessModule } from './business/business.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: false, // Lanza un error si hay propiedades no permitidas
      transform: true, // Transforma el payload al tipo especificado en el DTO
    }),
  )
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
}
bootstrap()
