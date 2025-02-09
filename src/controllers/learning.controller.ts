import express from 'express'
import { createMicroLearning, getMicrolearningById, getMicroLearnings, updateMicroLearningById, deleteMicroLearningById } from '../helpers/learning.helper'

export const newMicroLearning = async (req: express.Request, res: express.Response) => {

    const { title, subtitle, description, vertical, typeOfContent } = req.body

    try {        
        const newmicrolearning = await createMicroLearning({
            info: { title,
                    subtitle,
                    description
            },
            dballInfo: {
                vertical,
                typeOfContent
            }
        })

        return res.status(200).json(newmicrolearning)

    } catch (error) {

        console.log(error)
        res.sendStatus(400)

    }
}

export const getMicrolearning = async (req: express.Request, res: express.Response) => {
    
    const { id } = req.params

    try {

        const microlearning = await getMicrolearningById(id)
        return res.status(200).json(microlearning)

    } catch (error) {

        console.log(error)
        res.sendStatus(400)

    }
}

export const getAllMicrolearnings = async (req: express.Request, res: express.Response) => {

    try {

        const microlearnings = await getMicroLearnings()
        return res.status(200).json(microlearnings)

    } catch (error) {

        console.log(error)
        res.sendStatus(400)

    }
}

export const updateMicroLearning = async (req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { title, subtitle, description, vertical, typeOfContent } = req.body

    try {

        const updatedmicrolearning = await updateMicroLearningById( id, {
            info: { title,
                subtitle,
                description
        },
        dballInfo: {
            vertical,
            typeOfContent
        }
        })

        updatedmicrolearning.save()

        return res.status(200).json(updatedmicrolearning)

    } catch (error) {

        console.log(error)
        res.sendStatus(400)

    }
}

export const deleteMicroLearning = async (req: express.Request, res: express. Response) => {
    
    const { id } = req.params

    try {

        const deletedmicrolearning = await deleteMicroLearningById(id)
        return res.status(200).json(deletedmicrolearning)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}