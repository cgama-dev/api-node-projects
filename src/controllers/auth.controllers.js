import User from "../models/users.models"

import bcrypt from 'bcryptjs'

import Util from './../util'

const AuthController = (app) => {
    
    const util = Util()

    const Auth = {
        query: async (req, res) => {
            res.send('Users')
        },
        create: async (req, res) => {
            const { email } = req.body
            try {

                if (await User.findOne({ email })) {
                    return res.status(400).send({
                        error: 'Email do usuário já existe'
                    })
                }

                const user = await User.create(req.body)

                user.password = undefined

                const token = util.generateToken(user)

                return res.send({ user, token})

            } catch (err) {
                return res.status(400).send({
                    error: 'Erro ao registrar usuário'
                })
            }
        },
        login: async (req, res) => {
            const { email, password } = req.body

            const user = await User.findOne({ email }).select('+password')

            if (!user) {
                return res.status(400).send({ error: 'Usuário não encontrado' })
            }

            if (! await bcrypt.compare(password, user.password)) {
                return res.status(400).send({ errro: "Sua senha de usuário está incorreta" })
            }

            user.password = undefined

            const token = util.generateToken(user)

            res.send({ user, token })

        }
    }

    return Auth
}

export default AuthController