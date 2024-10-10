import { Injectable } from '@nestjs/common'
import { MongoClient, ServerApiVersion } from 'mongodb'

@Injectable()
export class DatabaseService {
  async connect() {
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
      await client.db('admin').command({ ping: 1 })
      console.log(
        'Pinged your deployment. You successfully connected to MongoDB!',
      )
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close()
    }
  }
}
