import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ email: 'ana.torre@example.com', password: 'password123' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(expect.any(Object))
      })
  })

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGVwZSIsImVtYWlsIjoic3RyaWdAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkMTIzIiwiaWF0IjoxNzI4NTg4MDE1fQ.jo7R6xI3GSWb_UENglQAIhbaV_wLwHnH0UuawbXp6OY',
      )
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true)
      })
  })

  it('/users (GET) with pagination', () => {
    return request(app.getHttpServer())
      .get('/users?page=1&limit=10')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGVwZSIsImVtYWlsIjoic3RyaWdAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkMTIzIiwiaWF0IjoxNzI4NTg4MDE1fQ.jo7R6xI3GSWb_UENglQAIhbaV_wLwHnH0UuawbXp6OY',
      )
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true)
      })
  })

  it('/users/search (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/search?email=ana.torres@example.com')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGVwZSIsImVtYWlsIjoic3RyaWdAZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkMTIzIiwiaWF0IjoxNzI4NTg4MDE1fQ.jo7R6xI3GSWb_UENglQAIhbaV_wLwHnH0UuawbXp6OY',
      )
      .expect(200)
      .expect((res) => {
        expect(res.body.name.toLowerCase()).toEqual('ana torres')
      })
  })
})
