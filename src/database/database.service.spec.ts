import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseService } from './database.service'
import { DatabaseController } from './database.controller'
import { ConfigModule } from '@nestjs/config'
import { ObjectId } from 'mongodb'
import { User, UserMongoDB } from '../schemas/user'

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
    const user = await service.getUser(new ObjectId('670805a425a53d1baba4ecab'))
    await service.close()
    expect(user).toBeInstanceOf(Object)
    expect(user.name).toBe('gonzo')
  })

  // get user
  it('should return a user', async () => {
    const user = await service.getUser(new ObjectId('670805a425a53d1baba4ecab'))
    await service.close()
    expect(user).toBeInstanceOf(Object)
    expect(user.name).toBe('gonzo')
  })

  // get user by invalid id
  it('should return null for an invalid user id', async () => {
    const user = await service.getUser(new ObjectId('000000000000000000000000'))
    await service.close()
    expect(user).toBeNull()
  })
  // mock function for getUser
  it('should call getUser with correct parameters', async () => {
    const getUserSpy = jest.spyOn(service, 'getUser').mockResolvedValue({
      _id: new ObjectId('670805a425a53d1baba4ecab'),
      name: 'gonzo',
      email: 'gonzo@example.com',
    } as UserMongoDB)

    const user = await service.getUser(new ObjectId('670805a425a53d1baba4ecab'))

    expect(getUserSpy).toHaveBeenCalledWith(
      new ObjectId('670805a425a53d1baba4ecab'),
    )
    expect(user.name).toBe('gonzo')

    getUserSpy.mockRestore()
  })

  // get user by email
  it('should return a user by email', async () => {
    const user = await service.getUserByEmail('ana.torres@example.com')
    await service.close()
    return expect(user.name).toBe('Ana Torres')
  })

  // add user - It's work but it's not recommended to use it in the test because it will add a user to the database with a email that already exists
  // it('should add a user', async () => {
  //   const user = {
  //     name: 'Juan Perez',
  //     email: 'juan@example.com',
  //     password: '1234',
  //   }
  //   await service.addUser(user)
  //   const result = await service.getUserByEmail(user.email)
  //   await service.close()
  //   expect(result.name).toBe(user.name)
  // })

  // delete user
  // funciona pero no es recomendable usarlo en la prueba porque eliminará un usuario de la base de datos con un correo electrónico que ya existe y los demas test no funcionarian posteriormente
  // it('should delete a user', async () => {
  //   const user = (await service.getUserByEmail(
  //     'ana.torres@example.com',
  //   )) as UserMongoDB // Add the email of the user you want to delete
  //   await service.deleteUser(user._id)
  //   const result = (await service.getUserByEmail(
  //     'ana.torres@example.com',
  //   )) as UserMongoDB // Add the email of the user you want to delete
  //   await service.close()
  //   expect(result).toBeNull()
  // })
})
