import request from 'supertest'
import randomString from 'random-string'
import models from '../../../models'
import UserRepo from '../../../repositories/user.repository'
import {
  uuid
} from '../../../utils/uuid'

const app = require('../../../app')

let userRepo
let user

beforeAll(async () => {

  userRepo = new UserRepo()
  // 사용자 2명 생성
  await userRepo.store({
    email: randomString() + '@test.com',
    password: randomString()
  })

  user = await userRepo.store({
    email: randomString() + '@test.com',
    password: randomString()
  })
})

afterAll(() => models.sequelize.close())

describe('GET: /v1/users', () => {

  test('전체 사용자 조회. | 200', async () => {
    let response = await request(app)
      .get(`/v1/users`)

    expect(response.body.length).toBeGreaterThan(1)
  })

  test('uuid 로 사용자 조회. | 200', async () => {
    let response = await request(app)
      .get(`/v1/users/${user.uuid}`)

    expect(response.body.email).toBe(user.email)
  })

  test('잘못된 uuid 로 사용자 조회. | 404', async () => {
    let response = await request(app)
      .get(`/v1/users/${uuid()}`)
      
    expect(response.statusCode).toBe(404)
  })
})