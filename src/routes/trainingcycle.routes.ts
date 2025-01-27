import express from 'express'
import { newTrainingCycle, getTrainingCycle, getAllTrainingCycles, updateTrainingCycle, addWorkoutToTrainingCycle, deleteWorkoutFromTrainingCycle, deleteTrainingCycle } from '../controllers/trainingcycle.controller'

export default(router: express.Router) => {
    router.post('/trainingCycles/newTrainingCycle', newTrainingCycle) // funciona
    router.get('/trainingCycles/:id', getTrainingCycle) // funciona
    router.get('/trainingCycles', getAllTrainingCycles) // funciona
    router.patch('/trainingCycles/:id', updateTrainingCycle) // funciona
    router.patch('/trainingCycles/:id/addWorkoutToTrainingCycle', addWorkoutToTrainingCycle)
    router.patch('/trainingCycles/:id/deleteWorkoutFromTrainingCycle', deleteWorkoutFromTrainingCycle)
    router.delete('/trainingCycles/:id', deleteTrainingCycle) // funciona
}