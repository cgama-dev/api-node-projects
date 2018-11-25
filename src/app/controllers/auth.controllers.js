import User from "../models/user.models"

import bcrypt from 'bcryptjs'

import Util from './../util'

import crypto from 'crypto'

import mailer from './../modules/mail'

const AuthController = (app) => {

    const util = Util()

    const Auth = {
        query: async (req, res) => {
            try {
                const users = await User.find()

                if (!users) {
                    return res.status(400).send({ error: 'Nenhum usuário encontrado' })
                }

                res.send(users)

            } catch (err) {
                return res.status(400).send({ error: 'Erro ao buscar usuários' })
            }

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

                return res.send({ user, token })

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

        },
        forgot_password: async (req, res) => {
            try {
                const { email } = req.body

                const user = await User.findOne({ email })

                if (!user)
                    return res.status(400).send({ error: 'Usuário não encontrado' })

                const token = crypto.randomBytes(20).toString('hex')

                const now = new Date()
                now.setHours(now.getHours() + 1)

                await User.findOneAndUpdate({ _id: user.id }, {
                    '$set': {
                        passwordResetToken: token,
                        passwordResetExpires: now
                    }
                })
                
                mailer.sendMail({
                    to: email,
                    from: 'cleytongama@gmail.com',
                    template: '/auth/forgot_password',
                    context: { token }
                }, (err) => {
                    if (err)
                        return res.status(400).send({ error: 'Erro ao enviar email' })

                    return res.send()
                })

            } catch (err) {
                res.status(400).send({ error: 'Error na recuperação de senha, tente novamente' })
            }
        },
        reset_password: async (req, res) => {
            const { email, password, token } = req.body

            try {
                const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires')

                if (!user)
                    return res.status(400).send({ error: 'Usuário não encontrado' })

                if (token !== user.passwordResetToken)
                    return res.status(400).send({ error: 'Token invalido' })

                const now = new Date()

                if (now > user.passwordResetExpires)
                    return res.status(400).send({ error: 'Token expirado' })

                user.password = password

                await user.save()

                return res.send()

            } catch (err) {
                res.status(400).send({ error: 'Não foi possivel resetar o password, tente novamente' })
            }
            res.send(req.body)
        }
    }

    return Auth
}

export default AuthController