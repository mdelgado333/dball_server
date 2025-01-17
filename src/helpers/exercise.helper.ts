import { ExerciseModel } from "../models/Exercise.model";

export const getExercises = () => ExerciseModel.find()
export const getExerciseById = (id: string) => ExerciseModel.findById(id)