import { Schema, model } from 'mongoose'

const MicroLearningSchema = new Schema({
    info: {
        title: { type: String, required: true },
        subtitle: { type: String, required: true},
        description: { type: String, required: true }
    }
})

export const MicroLearningModel = model('MicroLearning', MicroLearningSchema)