import { Schema, model } from 'mongoose'

export const CourseSchema = new Schema({
    info: {
        title: { type: String, required: true },
        subtitle: { type: String, required: true},
        description: { type: String, required: true }
    },
    dballInfo:{
        vertical: { 
            type: String,
            rquired: true,
            enum: ['ACADEMY', 'VERT'],
            default: 'ACADEMY'
        },
        typeOfContent: {
            type: String,
            required: true,
            enum: ['SHOOTING', 'DRIBBLING', 'FINISHING', 'ISO', 'POST', 'LOWER', 'UPPER', 'CARDIO'],
            default: 'SHOOTING'
        }
    },
    arrayOfMicroLearnings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'microlearning'
        }
    ]
})

export const Course = model('Course', CourseSchema)