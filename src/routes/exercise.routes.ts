import express from "express";
import { deleteExercise, getAllExercises, getExercise, newExercise, updateExercise } from "../controllers/exercise.controller";

export default (router: express.Router) => {
    router.get('/exercises', getAllExercises)
    router.get('/exercises/:id', getExercise)
    router.post('/exercises/newExercise', newExercise)
    router.patch('/exercises/:id', updateExercise) 
    router.delete('/exercises/:id', deleteExercise) 
}