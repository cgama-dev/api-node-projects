import express from 'express'
import AuthController from './../controllers/auth.controllers'

const UserRoute = (app) => {
    
    const controller = AuthController(app)

    const router = express.Router()

    router.get('/', controller.query)
    router.post('/register', controller.create)
    router.post('/authenticate', controller.login)
    router.get('/forgot_password', controller.forgot_password)
    router.put('/reset_password', controller.reset_password)

    return router
}

export default UserRoute
