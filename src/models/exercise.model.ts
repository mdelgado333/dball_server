import { Schema, model } from "mongoose";

const ExerciseSchema = new Schema({
    info: {
        title: { type: String, required: true },
        subtitle: { type: String, required: true},
        description: { type: String, required: true }
    } ,
    details: {
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        rest: { type: String, required: true }
    }
})

export const ExerciseModel = model('Exercise', ExerciseSchema)