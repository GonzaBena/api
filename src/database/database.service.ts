import { Injectable } from '@nestjs/common'
import {
  Collection,
  Db,
  MongoClient,
  ObjectId,
  ServerApiVersion,
} from 'mongodb'
import { User, UserMongoDB } from '../schemas/user'
import { ConfigService } from '@nestjs/config'
import { CryptographyService } from '../cryptography/cryptography.service'

@Injectable()
export class DatabaseService {
  private client: MongoClient
  private db: Db
  private collection: Collection<User>
  private crypto = new CryptographyService()

  async connect() {
    const uri = new ConfigService().get<string>('URI_DB')

    if (!uri) {
      throw new Error('The URI_DB environment variable is not set')
    }

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })

    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect()
      // Send a ping to confirm a successful connection
      this.client = client
      this.db = client.db('Conexa')
      this.collection = this.db.collection('usuarios')
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!',
      )
      return 'Connected to database'
    } catch (error) {
      console.error('Failed to connect to the database:', error)
      // Ensures that the client will close when you finish/error
      await this.close()
      throw new Error('Failed to connect to the database')
    }
  }

  async getUsers(page: number = 1, limit: number = 10): Promise<any> {
    if (!this.client) await this.connect()
    limit = limit < 10 ? 10 : parseInt(limit.toString())
    return this.collection
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
  }

  async getUser(id: ObjectId): Promise<UserMongoDB> {
    if (!this.client) await this.connect()
    if (!id || !ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId')
    }
    return this.collection.findOne({ _id: id }) as Promise<UserMongoDB>
  }

  async getUserByEmail(email: string): Promise<User> {
    if (!this.client) await this.connect()
    return this.collection.findOne({
      email: email.trim().toLowerCase(),
    }) as Promise<User>
  }

  async addUser(user: User) {
    if (!this.client) await this.connect()
    await this.collection.insertOne(user)
  }

  async addUsers(users: User[]) {
    if (!this.client) await this.connect()
    await this.collection.insertMany(users)
  }

  async updateUser(id: number, user: User) {}

  async deleteUser(id: ObjectId) {
    if (!this.client) await this.connect()
    return this.collection.deleteOne({ _id: id })
  }

  async close() {
    // Close the connection
    await this.client.close()
  }
}
