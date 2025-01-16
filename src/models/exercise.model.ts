import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    exerciseName: {
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

export const ExerciseModel = mongoose.model('Exercise', ExerciseSchema)