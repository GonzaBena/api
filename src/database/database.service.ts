import { Injectable } from '@nestjs/common'
import {
  Collection,
  CollectionInfo,
  Db,
  MongoClient,
  ServerApiVersion,
} from 'mongodb'
import { User } from '@schemas/user'

@Injectable()
export class DatabaseService {
  private client: MongoClient
  private db: Db
  private collection: Collection<User>

  async connect() {
    if (this.client) await this.client.close()
    const uri =
      'mongodb+srv://gonzalo:gonzalo1@cluster0.g3qjlpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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
    } catch {
      // Ensures that the client will close when you finish/error
      this.close()
    }
  }

  async getUsers(): Promise<any> {
    return this.collection.find().toArray()
  }

  async getUser(id: number): Promise<User> {
    return null
  }

  async getUserByEmail(email: string): Promise<User> {
    return null
  }

  async createUser(user: User) {}

  async updateUser(id: number, user: User) {}

  async deleteUser(id: number) {}

  async close() {
    // Close the connection
    await this.client.close()
  }
}
