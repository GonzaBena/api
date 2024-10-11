import { ObjectId } from 'mongodb'

export class User {
  name: string
  email: string
  password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}

export class UserMongoDB {
  _id: ObjectId
  name: string
  email: string
  password: string
  created_at?: string
  admin?: boolean
}
