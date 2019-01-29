import models from '../models'

export default {
  // CREATE
  store: async (data) => await models.User.create(data),

  // READ
  all: async () => await models.User.findAll(),

  find: async (uuid) => {
    return await models.User.findOne({
      where: {
        uuid: Buffer(uuid, 'hex')
      }
    })
  },
  
  findById: async (id) => await models.User.findByPk(id),

  findByEmail: async (email) => await models.User.findOne({
    where: {
      email,
    }
  })
  
  // UPDATE
  // DELETE
}