import { Schema, model } from "mongoose";

const WorkoutSchema = new Schema({
    info:{
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
    arrayOfExercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'exercise'
        }
    ]
})

export const Workout = model('Workout', WorkoutSchema)