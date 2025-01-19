import { ExerciseModel } from "../models/Exercise.model";

export const getExercises = () => ExerciseModel.find()
export const getExerciseById = (id: string) => ExerciseModel.findById(id)
export const createExercise = (values: Record<string, any>) => new ExerciseModel(values)
    .save().then((exercise) => exercise.toObject())
export const updateExerciseById = (id: string, values: Record<string, any>) => ExerciseModel.findByIdAndUpdate(id, values)
export const deleteExerciseById = (id: string) => ExerciseModel.findOneAndDelete({_id: id})