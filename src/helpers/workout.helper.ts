import { WorkoutModel } from "../models/Workout.model";

export const createWorkout = (values: Record<string, any>) => new WorkoutModel(values)
     .save().then((workout) => workout.toObject())
export const getWorkouts = () => WorkoutModel.find()
export const getWorkoutById = (id: string) => WorkoutModel.findById(id)
export const updateWorkoutById = (id: string, values: Record<string, any>) => WorkoutModel.findByIdAndUpdate(id, values)
export const deleteWorkoutById = (id: string) => WorkoutModel.findOneAndDelete({ _id: id })