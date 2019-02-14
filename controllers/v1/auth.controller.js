import httpStatus from 'http-status'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserRepo from '../../repositories/user.repository'
import response from '../../utils/response'
import { logger } from '../../configs/winston'

const login = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const userRepo = new UserRepo()
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
    const payload = {
      email: user.email,
      uuid: user.uuid
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN
    })

    return response(res, {
      token
    })
  } catch (e) {
    next(e)
  }
}

const tokenTest = async (req, res, next) => {
  try {
    return response(res, req.user)
  } catch (e) {
    next(e)
  }
}

export { login, tokenTest }
