import express from 'express'
import {
  login
} from '../../controllers/v1/auth.controller'

const router = express.Router()

router.route('/login')
  .post(
    login
  )

export default router
