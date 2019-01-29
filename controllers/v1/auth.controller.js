import httpStatus from 'http-status'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userRepo from '../../repositories/user.repository'
import response from '../../utils/response'

const login = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await userRepo.findByEmail(email)

    if (!user) {
      return next(createError(404, '사용자를 찾을 수 없습니다.'))
    }

    // 비밀번호 compare
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return next(createError(422, '비밀번호를 확인 해주세요.'))
    }

    // jwt payload 에 담길 내용
    const payload = {message: 'access granted'}

    // jwt 를 signing 하는 암호화된 key : 절대 노출 금지
    const secret = 'secret'

    // jwt 만료 시간 (ms)
    const ttl = 3600000 // 1 시간

    const token = jwt.sign(payload, secret, {
      expiresIn: ttl
    })

    return response(res, {token})
  } catch (e) {
    next(e)
  }
}

export {
  login
}
