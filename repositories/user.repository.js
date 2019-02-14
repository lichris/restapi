import models from '../models'
import UserCache from '../caches/user.cache'
import UserWrapper from '../wrappers/user.wrapper'

class UserRepository {
  constructor() {
    this.userCache = new UserCache()
  }

  async store(data) {
    const user = await models.User.create(data)
    await this.userCache.store(user)
    return UserWrapper.create(user)
  }

  async all() {
    const users = await models.User.findAll()
    return users.map(user => UserWrapper.create(user))
  }

  async find(uuid) {
    let user = await this.userCache.find(uuid)

    if (!user) {
      // Cache 가 존재하지 않으면 DB 에서 받아옴
      user = await models.User.findOne({
        where: {
          uuid: Buffer(uuid, 'hex')
        }
      })
    }

    return UserWrapper.create(user)
  }

  async findById(id) {
    let user = await this.userCache.findById(id)

    if (!user) {
      user = await models.User.findByPk(id)
    }

    return UserWrapper.create(user)
  }

  async findByEmail(email) {
    let user = await this.userCache.findByEmail(email)

    if (!user) {
      user = await models.User.findOne({
        where: {
          email
        }
      })
    }

    return UserWrapper.create(user)
  }
}

export default UserRepository
