import { Schema, model } from "mongoose";

const WorkoutSchema = new Schema({
    info:{
        title: { type: String, required: true },
        subtitle: { type: String, required: true},
        description: { type: String, required: true }
    },
    arrayOfExercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'exercise'
        }
    ]
})

export const WorkoutModel = model('Workout', WorkoutSchema)