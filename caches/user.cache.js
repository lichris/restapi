const redis = require('redis')
const bluebird = require('bluebird')
const client = redis.createClient()
// redis 의 모든 함수를 promisify
bluebird.promisifyAll(client)

const store = async (user) => {
  await client.hsetAsync('users:id', [user.id, user.uuid])
  await client.hsetAsync('users:email', [user.email, user.uuid])
  await client.hsetAsync('users:uuid', [user.uuid, JSON.stringify(user.toJSON())])
}

const find = async (uuid) => {
  if (uuid) {
    const user = await client.hgetAsync('users:uuid', `${uuid}`)

    return JSON.parse(user)
  }

  return null
}

const findById = async (id) => {
  const uuid = await client.hgetAsync('users:id', `${id}`)

  return find(uuid)
}

const findByEmail = async (email) => {
  const uuid = await client.hgetAsync('users:email', `${email}`)

  return find(uuid)
}

export default {
  store,
  find,
  findById,
  findByEmail
}