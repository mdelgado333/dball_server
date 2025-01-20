import express from "express"
import { deleteWorkout, getAllWorkouts, getWorkout, newWorkout, updateWorkout } from "../controllers/workout.controller"

export default (router: express.Router) => {
    router.get('/workouts', getAllWorkouts)
    router.get('/workouts/:id', getWorkout)
    router.post('/workouts/newWorkout', newWorkout)
    router.patch('/workouts/:id', updateWorkout)
    router.delete('/workouts/:id', deleteWorkout)
}