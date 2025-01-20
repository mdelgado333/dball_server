import express from "express"
import { addExerciseToWorkout, deleteWorkout, getAllWorkouts, getWorkout, newWorkout, updateWorkout } from "../controllers/workout.controller"

export default (router: express.Router) => {
    router.get('/workouts', getAllWorkouts)
    router.get('/workouts/:id', getWorkout)
    router.post('/workouts/newWorkout', newWorkout) //funciona
    router.patch('/workouts/:id/addExercise', addExerciseToWorkout) //funciona
    router.patch('/workouts/:id', updateWorkout) //funciona
    router.delete('/workouts/:id', deleteWorkout)
}