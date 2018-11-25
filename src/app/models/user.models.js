import mongoose from './../../database'
import bycrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

UserSchema.pre('save', async function (next) {

    const hash = await bycrypt.hash(this.password, 10)

    this.password = hash

    next()
})

const User = mongoose.model('User', UserSchema)

export default User