const redis = require('redis')
const bluebird = require('bluebird')
import UserRepo from '../repositories/user.repository'

class UserCache {
  constructor() {
    this.client = redis.createClient()
    this.client.on('connenct', () => {
      bluebird.promisifyAll(client)
    })

    this.client.on('error', (e) => {
      console.error(`redis error : ${e}`)
    })
  }

  async store(user) {
    try {
      await this.client.hsetAsync('users:id', [user.id, user.uuid])
      await this.client.hsetAsync('users:email', [user.email, user.uuid])
      await this.client.hsetAsync('users:uuid', [user.uuid, JSON.stringify(user.toJSON())])
    } catch (e) {
      // error 로깅 
    }
  }

  async find(uuid) {
    if (uuid) {
      try {
        const user = await this.client.hgetAsync('users:uuid', uuid)

        if (!user) {
          return null
        }
        
        return JSON.parse(user)
      } catch (e) {
        // error 로깅
        return null
      }
    }
    return null
  }

  async findById(id) {
    if (id) {
      try {
        const uuid = await this.client.hgetAsync('users:id', id)
        return this.find(uuid)
      } catch (e) {
        // error 로깅
        return null
      }
    }
    return null
  }

  async findByEmail(email) {
    if (email) {
      try {
        const uuid = await this.client.hgetAsync('users:email', email)
        return this.find(uuid)
      } catch (e) {
        // error 로깅
        return null
      }
    }
    return null
  }
}

export default UserCache