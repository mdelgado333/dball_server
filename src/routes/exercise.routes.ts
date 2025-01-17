import { getAllExercises, getExercise } from "../controllers/exercise.controller";
import express from "express";

export default (router: express.Router) => {
    router.get('/exercises', getAllExercises)
    router.get('/exercises/:id', getExercise)
}