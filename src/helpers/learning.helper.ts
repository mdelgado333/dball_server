import { Learning } from "../models/Learning.model";

export const createMicroLearning = (values: Record<string,any>) => new Learning(values)
    .save().then((microlearning)=> microlearning.toObject())
export const getMicrolearningById = (id: string) => Learning.findById(id)
export const getMicroLearnings = () => Learning.find()
export const updateMicroLearningById = (id: string, values: Record<string,any>) => Learning.findByIdAndUpdate(id, values)
export const deleteMicroLearningById = (id: string) => Learning.findOneAndDelete({ _id: id })