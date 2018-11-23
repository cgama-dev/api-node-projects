import jwt from 'jsonwebtoken'

import authConfig from '../config/auth'

const Util = () => {

    const utilObject = {
        generateToken: (param) => jwt.sign({ id: param.id }, authConfig.secret, {
            expiresIn: 86400
        })
    }

    return utilObject
}

export default Util