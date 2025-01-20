import express from 'express'

import { createWorkout, deleteWorkoutById, getWorkoutById, getWorkouts } from '../helpers/workout.helper'

export const getAllWorkouts = async (req: express.Request, res: express.Response) => {
    try {
        const workouts = await getWorkouts()
        return res.status(200).json(workouts)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const getWorkout = async (req: express.Request, res: express.Response) =>{
    try {
        const { id } = req.params
        const workout = await getWorkoutById(id)
        return res.status(200).json(workout)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const newWorkout = async (req: express.Request, res: express.Response) => {
    try {
        const { title, subtitle, description, vertical, typeOfContent, exercise1, exercise2, exercise3 } = req.body
        console.log("EXERCISE 1: ", exercise1)
        console.log("EXERCISE 2: ", exercise2)
        console.log("EXERCISE 3: ", exercise3)

        const workout = await createWorkout({
                    info:{ title, subtitle, description },
                    dballInfo: { vertical, typeOfContent },
                    arrayOfExercises: [ exercise1, exercise2, exercise3 ] 
            })

        return res.status(200).json(workout)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const addExerciseToWorkout = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { newExercise } = req.body

        const updatedWorkout = await getWorkoutById(id)

        updatedWorkout.arrayOfExercises.push(newExercise)

        await updatedWorkout.save()
        
        return res.status(200).json(updatedWorkout)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const updateWorkout = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { title, subtitle, description, vertical, typeOfContent, exercise1, exercise2, exercise3 } = req.body

        const updatedWorkout = await getWorkoutById(id)

        // updatedWorkout.info.title = title
        // updatedWorkout.info.subtitle = subtitle
        // updatedWorkout.info.description = description

        // updatedWorkout.dballInfo.vertical = vertical
        // updatedWorkout.dballInfo.typeOfContent = typeOfContent

        // updatedWorkout.arrayOfExercises[1] = exercise1
        // updatedWorkout.arrayOfExercises[2] = exercise2
        // updatedWorkout.arrayOfExercises[3] = exercise3


        // await updatedWorkout.save()

        return res.status(200).json(updatedWorkout)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
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