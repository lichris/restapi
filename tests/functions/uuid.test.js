import randomString from 'random-string'
import models from '../../models'
import {
  uuid
} from '../../utils/uuid'

afterAll(() => models.sequelize.close())

test('ordered UUID 가 출력되어야 합니다.', () => {
  const orderedUuid = uuid()

  expect(orderedUuid).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})

test('사용자를 생성하면 uuid 가 정상 생성되어야 합니다', async () => {
  const user = await models.User.create({
    email: `${randomString()}@test.com`,
    password: randomString()
  })

  expect(user.uuid).toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})