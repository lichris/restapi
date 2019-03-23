import express from 'express'

const router = express.Router()

router.route('/')
  .get((req, res, next) => {
    next(new Error('센트리 테스트 에러 발생'))
  })

export default router
