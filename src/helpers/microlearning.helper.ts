import { MicroLearning } from "../models/MicroLearning.model";

export const createMicroLearning = (values: Record<string,any>) => new MicroLearning(values)
    .save().then((microlearning)=> microlearning.toObject())
export const getMicrolearningById = (id: string) => MicroLearning.findById(id)
export const getMicroLearnings = () => MicroLearning.find()
export const updateMicroLearningById = (id: string, values: Record<string,any>) => MicroLearning.findByIdAndUpdate(id, values)
export const deleteMicroLearningById = (id: string) => MicroLearning.findOneAndDelete({ _id: id })