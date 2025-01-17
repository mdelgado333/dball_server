import express from 'express'

import { deleteWorkoutById, getWorkouts } from 'helpers/workout.helper'

export const getAllWorkouts = async (req: express.Request, res: express.Response) => {
    try {
        const workouts = await getWorkouts()
        return res.status(200).json(workouts)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const deleteWorkout = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedWorkout = await deleteWorkoutById(id)
        return res.json(deletedWorkout)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const updateWorkout = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        // tengo que hacerlo
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}