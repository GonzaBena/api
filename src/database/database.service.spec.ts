import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseService } from './database.service'
import { DatabaseController } from './database.controller'
import { ConfigModule } from '@nestjs/config'
import { ObjectId } from 'mongodb'
import { User } from '../schemas/user'

describe('DatabaseService', () => {
  let service: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env', // Ruta al archivo .env
          isGlobal: true, // Hace que ConfigModule esté disponible en todo el módulo de prueba
        }),
      ],
      providers: [DatabaseService, DatabaseController],
    }).compile()

    service = module.get<DatabaseService>(DatabaseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // get users
  it('should return an array of users', async () => {
    const users = await service.getUsers()
    await service.close()
    expect(users).toBeInstanceOf(Array)
  })

  //get user
  it('should return a user', async () => {
    const user = await service.getUser(new ObjectId('6708385e5bf31e40b5f73a8e'))
    await service.close()
    expect(user).toBeInstanceOf(Object)
    expect(user.name).toBe('Ana Torres')
  })
})
