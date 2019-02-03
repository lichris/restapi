import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import UserRepo from '../repositories/user.repository'

export default async (req, res, next) => {
  try {
    req.user = null

    if (req.headers.authorization) {
      let uuid
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_SECRET,
        (err, payload) => {
          if (err) {
            return next(createError(401, '토큰 정보가 유효하지 않습니다.'))
          }

          uuid = payload.uuid
        })

      const userRepo = new UserRepo()
      const user = await userRepo.find(uuid)

      if (!user) {
        return next(createError(404, '사용자를 찾을 수 없습니다.'))
      }

      req.user = user
    }

    next()
  } catch (e) {
    next(e)
  }
}