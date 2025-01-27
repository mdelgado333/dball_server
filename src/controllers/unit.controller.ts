import express from 'express'
import { createUnit, deleteUnitbyId, getUnitById, getUnits } from '../helpers/unit.helper'

export const newUnit = async (req: express.Request, res: express.Response) => {

    const { title, subtitle, description, vertical, typeOfContent } = req.body

    try {

        const unit = await createUnit({
            info: {
                title,
                subtitle,
                description
            },
            dballInfo: {
                vertical,
                typeOfContent
            }
        })

        return res.status(200).json(unit)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const getUnit = async(req: express.Request, res: express.Response) => {

    const { id } = req.params

    try {

        const unit = await getUnitById(id)
        res.status(200).json(unit)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const getAllUnits = async(req: express.Request, res: express.Response) => {

    try {
        
        const units = await getUnits()
        res.status(200).json(units)

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const updateUnit = async(req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { title, subtitle, description, vertical, typeOfContent } = req.body

    try {

        const updatedUnit = await getUnitById(id)

        updatedUnit.info.title = title
        updatedUnit.info.subtitle = subtitle
        updatedUnit.info.description = description

        updatedUnit.dballInfo.vertical = vertical
        updatedUnit.dballInfo.typeOfContent = typeOfContent

        await updatedUnit.save()

        return res.status(200).json(updatedUnit)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const addMicroLearningToUnit = async(req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { microlearning } = req.body

    try {

        const updatedUnit = await getUnitById(id)
        updatedUnit.microLearnings.push(microlearning)
        await updatedUnit.save()
        return res.status(200).json(updatedUnit)
    
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const deleteMicroLearningFromUnit = async(req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { idx } = req.body

    try {

        const updatedUnit = await getUnitById(id)
        updatedUnit.microLearnings.splice(idx,1)
        await updatedUnit.save()
        return res.status(200).json(updatedUnit)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const deleteUnit = async(req: express.Request, res: express.Response) => {

    const { id } = req.params

    try {

        const deletedUnit = await deleteUnitbyId(id)
        res.status(200).json(deletedUnit)
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}