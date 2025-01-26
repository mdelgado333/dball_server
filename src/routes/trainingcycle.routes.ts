import express from 'express'
import { newTrainingCycle, getTrainingCycle, getAllTrainingCycles, updateTrainingCycle, addWorkoutToTrainingCycle, deleteWorkoutFromTrainingCycle, deleteTrainingCycle } from '../controllers/trainingcycle.controller'

export default(router: express.Router) => {
    router.post('/trainingCycles/newTrainingCycle', newTrainingCycle)
    router.get('/trainingCycle/:id', getTrainingCycle)
    router.get('/trainingCycle', getAllTrainingCycles)
    router.patch('/trainingCycle/:id', updateTrainingCycle)
    router.patch('/trainingCycle/:id/addWorkoutToTrainingCycle', addWorkoutToTrainingCycle)
    router.patch('/trainingCycle/:id/deleteWorkoutFromTrainingCycle', deleteWorkoutFromTrainingCycle)
    router.delete('/trainingCycle/:id', deleteTrainingCycle)
}