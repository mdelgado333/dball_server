import { Schema, model } from 'mongoose'

const CycleSchema = new Schema({
    info: {
        title: { type: String, required: true },
        subtitle: { type: String, required: true},
        description: { type: String, required: true }
    },
    arrayOfWorkouts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'workout'
        }
    ]
})