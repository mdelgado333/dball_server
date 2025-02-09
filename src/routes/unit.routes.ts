import express from 'express'
import { Unit } from '../models/Unit.model'

export default (router: express.Router) => {
    router.post('/units/newUnit', async (req: express.Request, res: express.Response) => {

        const { title, subtitle, description, vertical, typeOfContent } = req.body
        
            try {
        
                const newUnit = new Unit({
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

                await newUnit.save()
                return res.status(200).json(newUnit)
                
            } catch (error) {
                console.log(error)
                res.sendStatus(400)
            }

    })

    router.get('/units/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        
            try {
        
                const unit = await Unit.findById(id)
                return res.status(200).json(unit)
                
            } catch (error) {
                console.log(error)
                res.sendStatus(400)
            }

    })

    router.get('/units', async (req: express.Request, res: express.Response) => {

        try {
                
                const units = await Unit.find()
                res.status(200).json(units)
        
            } catch (error) {
                console.log(error)
                res.sendStatus(400)
            }

    })
    
    router.patch('/units/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { title, subtitle, description, vertical, typeOfContent } = req.body
        
        try {
    
            const updatedUnit = await Unit.findByIdAndUpdate(id, {
                info: {
                    title,
                    subtitle,
                    description
                },
                dballInfo: {
                    vertical,
                    typeOfContent
                }
            }, {new: true})

            return res.status(200).json(updatedUnit)
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })
    
    router.patch('/units/:id/addLearning', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { learning } = req.body

        try {

            const updatedUnit = await Unit.findByIdAndUpdate(id,
                { $push: { learnings: learning } },
                { new: true})

            return res.status(200).json(updatedUnit)
        
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })
    
    router.patch('/units/:id/deleteLearning', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { idx } = req.body

        try {

            const updatedUnit = await Unit.findById(id)

            updatedUnit.learnings.splice(idx, 1)
            await updatedUnit.save()

            return res.status(200).json(updatedUnit)
        
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })
    
    router.delete('/units/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params

        try {
            
            const deletedLearning = await Unit.findOneAndDelete({ _id: id })
            return res.status(200).json(deletedLearning)

        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })
}