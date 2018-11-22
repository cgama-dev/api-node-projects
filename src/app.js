import express from 'express'
import bodyParser from 'body-parser'

import userRoute  from './routes/user.route'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/users', userRoute)

app.listen(5001, () => console.log('Servidaor rodando'))