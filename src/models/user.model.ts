import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
    role: {
        type: String,
        enum: ['FREE', 'PAID', 'ADMIN'],
        default: 'FREE'
    }
})

export const User = model('User', UserSchema)