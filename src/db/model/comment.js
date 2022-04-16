import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
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

export const CommentModel = mongoose.model('Comment', CommentSchema)
export const CommentTC = composeWithMongoose(CommentModel)