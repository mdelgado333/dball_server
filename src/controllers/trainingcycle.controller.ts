import express from 'express'
import { createTrainingCycle, getTrainingCycleById, getTrainingCycles, deleteTrainingCycleById } from '../helpers/trainingcycle.helper'
import { update } from 'lodash'

export const newTrainingCycle = async (req: express.Request, res: express.Response) => {

    const { title, subtitle, description, vertical, typeOfContent, workout } = req.body
    
    try {
    
        const newTrainingCycle = await createTrainingCycle({
            info: {
                title,
                subtitle,
                description
            },
            dballInfo: {
                vertical,
            typeOfContent
            },
            arrayOfWorkouts: {
                workout
            }
        })

        return res.status(200).json(newTrainingCycle)

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const getTrainingCycle = async (req: express.Request, res: express.Response) => {

    const { id } = req.params

    try {
        
        const trainingcycle = await getTrainingCycleById(id)
        return res.status(200).json(trainingcycle)

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

}

export const getAllTrainingCycles = async (req: express.Request, res: express.Response) => {

    try {

        const trainingcycle = await getTrainingCycles()
        return res.status(200).json(trainingcycle)

    } catch (error) {
        console.log(error)
    }

}

export const updateTrainingCycle = async (req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { title, subtitle, description, vertical, typeOfContent } = req.body

    try {

        const updatedTrainingCycle = await getTrainingCycleById(id)

        updatedTrainingCycle.info.title = title
        updatedTrainingCycle.info.subtitle = subtitle
        updatedTrainingCycle.info.description = description

        updatedTrainingCycle.dballInfo.vertical = vertical
        updatedTrainingCycle.dballInfo.typeOfContent = typeOfContent

        await updatedTrainingCycle.save()
        return res.status(200).json(updatedTrainingCycle)
        
    } catch (error) {
        console.log(error)
        res.status(400)
    }

}

export const addWorkoutToTrainingCycle = async (req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { workout } = req.body

    try {

        const trainingcycle = await getTrainingCycleById(id)

        trainingcycle.arrayOfWorkouts.push(workout)
        await trainingcycle.save()

        return res.status(200).json(trainingcycle)

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

}

export const deleteWorkoutFromCycle = async (req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { idx } = req.body

    try {

        const updatedTrainingCycle = await getTrainingCycleById(id)

        updatedTrainingCycle.arrayOfWorkouts.splice(idx, 1)
        await updatedTrainingCycle.save()

        return res.status(200).json(updatedTrainingCycle)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

}

export const deleteTrainingCycle = async (req: express.Request, res: express.Response) => {

    const { id } = req.params
    
    try {
        
        const deletedTrainingCycle = await deleteTrainingCycleById(id)
        return res.status(200).json(deletedTrainingCycle)

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}