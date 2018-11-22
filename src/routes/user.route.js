import express from 'express'

import AuthController from './../controllers/auth.controllers'

const controller = AuthController()

const router = express.Router()

router.get('/', controller.query)

export default router
