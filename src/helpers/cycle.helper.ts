import { Cycle } from "../models/Cycle.model";

export const createTrainingCycle = (values: Record<string, any>) => new Cycle(values)
    .save().then((trainingcycle) => trainingcycle.toObject())
export const getTrainingCycleById = (id: string) => Cycle.findById(id)
export const getTrainingCycles = () => Cycle.find()
export const deleteTrainingCycleById = (id: string) => Cycle.findOneAndDelete({ _id: id })