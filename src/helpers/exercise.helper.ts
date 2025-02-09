import { Exercise } from "../models/Exercise.model";

export const getExercises = () => Exercise.find()
export const getExerciseById = (id: string) => Exercise.findById(id)
export const createExercise = (values: Record<string, any>) => new Exercise(values)
    .save().then((exercise) => exercise.toObject())
export const updateExerciseById = (id: string, values: Record<string, any>) => Exercise.findByIdAndUpdate(id, values)
export const deleteExerciseById = (id: string) => Exercise.findOneAndDelete({_id: id})