import User from "../models/users.models";

const AuthController = () => {

    const Auth = {
        query: async (req, res) => {
            res.send('Users')  
        },
        create: async (req, res) => {
            try {
                const user = await User.create(req.body)

                return res.send({
                    user
                })
            } catch (err) {
                return res.status(400).send({
                    error: 'Registration faild'
                })
            }
        }
    }

    return Auth
}

export default AuthController