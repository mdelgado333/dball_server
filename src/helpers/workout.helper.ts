import { WorkoutModel } from "models/Workout.model";

export const getWorkouts = () => WorkoutModel.find()
// export const getUserById = (id: string) => UserModel.findById(id)
// export const createUser = (values: Record<string, any>) => new UserModel(values)
//     .save().then((user) => user.toObject())
export const deleteWorkoutById = (id: string) => WorkoutModel.findOneAndDelete({ _id: id })
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)