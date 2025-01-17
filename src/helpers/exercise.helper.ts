import { ExerciseModel } from "../models/Exercise.model";

export const getExercises = () => ExerciseModel.find()
export const getExerciseById = (id: string) => ExerciseModel.findById(id)
export const createExercise = (values: Record<string, any>) => new ExerciseModel(values)
export const updateExerciseById = (id: string, values: Record<string, any>) => ExerciseModel.findByIdAndUpdate(id, values)
export const deleteExerciseById = (id: string) => ExerciseModel.findByIdAndDelete({_id: id})