import { Workout } from "../models/Workout.model";

export const createWorkout = (values: Record<string, any>) => new Workout(values)
     .save().then((workout) => workout.toObject())
export const getWorkouts = () => Workout.find()
export const getWorkoutById = (id: string) => Workout.findById(id)
export const updateWorkoutById = (id: string, values: Record<string, any>) => Workout.findByIdAndUpdate(id, values)
export const deleteWorkoutById = (id: string) => Workout.findOneAndDelete({ _id: id })