import express from 'express'
import { createExercise, deleteExerciseById, getExerciseById, getExercises } from '../helpers/exercise.helper'

export const getAllExercises = async (req: express.Request, res: express.Response) => {
    try {
        const exercises = await getExercises()
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

export const newExercise = async (req: express.Request, res: express.Response) => {
    try {
        const {title, subtitle, description, sets, reps, minutes, seconds, vertical, typeOfContent } = req.body

        const exercise = await createExercise({
            info:{ title, subtitle, description },
            details:{ sets, reps, rest: { minutes, seconds } },
            dballInfo: { vertical, typeOfContent }
    })

        return res.status(200).json(exercise)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const updateExercise = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { title, subtitle, description, sets, reps, minutes, seconds, vertical, typeOfContent } = req.body

        const exercise = await getExerciseById(id)

        exercise.info.title = title
        exercise.info.subtitle = subtitle
        exercise.info.description = description

        exercise.details.sets = sets
        exercise.details.reps = reps
        exercise.details.rest.minutes = minutes
        exercise.details.rest.seconds = seconds


        exercise.dballInfo.vertical = vertical
        exercise.dballInfo.typeOfContent = typeOfContent

        await exercise.save()

        return res.status(200).json(exercise)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const deleteExercise = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        console.log('----------------------------------', id)

        const deletedExercise = await deleteExerciseById(id)

        console.log('deletedExercise',deletedExercise)

        return res.json(deletedExercise)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}