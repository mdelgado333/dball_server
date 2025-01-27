import express from 'express'
import { addMicroLearningToUnit, deleteMicroLearningFromUnit, deleteUnit, getAllUnits, getUnit, newUnit, updateUnit } from '../controllers/unit.controller'

export default (router: express.Router) => {
    router.post('/units/newUnit', newUnit)
    router.get('/units/:id', getUnit)
    router.get('/units', getAllUnits)
    router.patch('/units/:id', updateUnit)
    router.patch('/units/:id/addMicroLearningToUnit', addMicroLearningToUnit)
    router.patch('/units/:id/deleteMicroLearningFromUnit', deleteMicroLearningFromUnit)
    router.delete('/units/:id', deleteUnit)
}