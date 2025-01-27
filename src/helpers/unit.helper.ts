import { Unit } from "../models/Unit.model";

export const createUnit = (values: Record<string, any>) => new Unit(values)
    .save().then((unit) => unit.toObject())
export const getUnitById = (id: string) => Unit.findById(id)
export const getUnits = () => Unit.find()
export const deleteUnitbyId = (id: string) => Unit.findOneAndDelete({ _id: id })