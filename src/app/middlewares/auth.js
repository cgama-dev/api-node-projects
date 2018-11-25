import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

const AuthMiddleware = (req, res, next) => {


    const authHeader = req.headers.authorization

    if (!authHeader) {
      return  res.status(401).send({ error: "Usuário não possui token para acessar " })
    }

    const parts = authHeader.split(" ")

    if (!parts.length === 2) {
      return  res.status(401).send({ error: "Token error" })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
       return res.status(401).send({ error: 'Token invalid formater' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
          return  res.status(401).send({ error: 'Token invalid' })
        }

        req.userId = decoded.id
    })

    return next()

}

export default AuthMiddleware