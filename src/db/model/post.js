import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: null
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        default: null
    }
})

export const PostModel = mongoose.model('Post', PostSchema)
export const PostTC = composeWithMongoose(PostModel)