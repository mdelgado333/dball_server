import { Schema, model } from 'mongoose'

const UnitSchema = new Schema({
    info: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    dballInfo: {
        vertical: {
            type: String,
            required: true,
            enum: ['ACADEMY', 'VERT'],
            default: 'ACADEMY'
        },
        typeOfContent: {
            type: String,
            required: true,
            enum: ['SHOOTING', 'DRIBBLING', 'FINISHING', 'ISO', 'POST', 'LOWER', 'UPPER', 'CARDIO'],
            default: 'SHOOTING' }
    },
    microLearnings: {
        type: Schema.Types.ObjectId,
        ref: 'microlearning'
    }
})

export const Unit = model('Unit', UnitSchema)