import express from 'express'
import { getExerciseById, getExercises } from '../helpers/exercise.helper'

export const getAllExercises = async (req: express.Request, res: express.Response) => {
    try {
        const exercises = await getExercises
        return res.status(200).json(exercises)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const getExercise = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params

        const exercise = await getExerciseById(id)

        return res.status(200).json(exercise)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}