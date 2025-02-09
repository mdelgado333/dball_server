import express from 'express'
import { Cycle } from '../models/Cycle.model'

export default(router: express.Router) => {

    router.post('/cycles/newCycle', async (req: express.Request, res: express.Response) => {
    
        const { title, subtitle, description, vertical, typeOfContent } = req.body
            
        try {
        
            const newCycle = new Cycle({
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
    
            await newCycle.save()
            res.status(200).json(newCycle)
    
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    })

    router.get('/cycles/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        
        try {
            
            const cycle = await Cycle.findById(id)
            res.status(200).json(cycle)
    
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.get('/cycles', async (req: express.Request, res: express.Response) => {

        try {
        
            const cycles = await Cycle.find()
            res.status(200).json(cycles)
        
        } catch (error) {
            console.log(error)
        }

    })

    router.patch('/cycles/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { title, subtitle, description, vertical, typeOfContent } = req.body
    
        try {
    
            const updatedCycle = await Cycle.findByIdAndUpdate(id, {
                info: {
                    title,
                    subtitle,
                    description
                },
                dballInfo: {
                    vertical,
                    typeOfContent
                }
            }, { new: true })
    
            res.status(200).json(updatedCycle)
            
        } catch (error) {
            console.log(error)
            res.status(400)
        }

    })

    router.patch('/cycles/:id/addWorkout', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { workout } = req.body
    
        try {
    
            const cycle = await Cycle.findByIdAndUpdate(id, {
                $push : { arrayOfWorkouts: workout }
            }, { new: true })
    
            res.status(200).json(cycle)
    
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.patch('/cycles/:id/deleteWorkout', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { idx } = req.body
    
        try {
    
            const updatedCycle = await Cycle.findById(id)
            updatedCycle.arrayOfWorkouts.splice(idx, 1)
            await updatedCycle.save()
    
            res.status(200).json(updatedCycle)
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.delete('/cycles/:id', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        
        try {
            
            const deletedCycle = await Cycle.findOneAndDelete({ _id: id })
            res.status(200).json(deletedCycle)
    
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

}