import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'
import bcrypt from 'mongoose-bcrypt'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
UserSchema.plugin(bcrypt)

export const UserModel = mongoose.model('User', UserSchema)
export const UserTC = composeWithMongoose(UserModel)

export default UserModel
