import { Schema, model } from 'mongoose'

export const LessonSchema = new Schema({
    info: {
        title: { type: String, required: true },
        subtitle: { type: String, required: true},
        description: { type: String, required: true }
    },
    arrayOfMicroLearnings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'microlearning'
        }
    ]
})

export const LessonModel = model('Lesson', LessonSchema)