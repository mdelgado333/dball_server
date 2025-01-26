import { TrainingCycle } from "../models/Cycle.model";

export const createTrainingCycle = (values: Record<string, any>) => new TrainingCycle(values)
    .save().then((trainingcycle) => trainingcycle.toObject())
export const getTrainingCycleById = (id: string) => TrainingCycle.findById(id)
export const getTrainingCycles = () => TrainingCycle.find()
export const deleteTrainingCycleById = (id: string) => TrainingCycle.findOneAndDelete({ _id: id })