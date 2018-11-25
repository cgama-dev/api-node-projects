import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import userRoute  from './app/routes/user.route'
import projectRoute  from './app/routes/project.route'

import authMiddleware from './app/middlewares/auth'

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())

app.use('/auth', userRoute(app))
app.use('/projects', authMiddleware, projectRoute(app))

app.listen(5001, () => console.log('Servidor rodando'))

export default app