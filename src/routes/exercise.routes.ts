import express from "express"
import { Exercise } from '../models/Exercise.model'

export default (router: express.Router) => {

    router.get('/exercises', async (req: express.Request, res: express.Response) => {

        try {
            const exercises = await Exercise.find()
            return res.status(200).json(exercises)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    })

    router.get('/exercises/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params

        try {
            const exercise = await Exercise.findById(id)
            return res.status(200).json(exercise)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.post('/exercises/newExercise', async (req: express.Request, res: express.Response) => {

        const {title, subtitle, description, sets, reps, minutes, seconds, vertical, typeOfContent } = req.body

        try {

            const newExercise = new Exercise({
                info:{ title, subtitle, description },
                details:{ sets, reps, rest: { minutes, seconds } },
                dballInfo: { vertical, typeOfContent }
            })

            await newExercise.save()
            return res.status(200).json(newExercise)
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.patch('/exercises/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { title, subtitle, description, sets, reps, minutes, seconds, vertical, typeOfContent } = req.body
    
        try {

            const updatedExercise = await Exercise.findByIdAndUpdate(id, {
                info:{ title, subtitle, description },
                details:{ sets, reps, rest: { minutes, seconds } },
                dballInfo: { vertical, typeOfContent }
            }, {new: true})

            await updatedExercise.save()

            return res.status(200).json(updatedExercise)
        
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    }) 

    router.delete('/exercises/:id', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        
            try {

                const deletedExercise = await Exercise.findOneAndDelete({_id: id})
                return res.status(200).json(deletedExercise)

            } catch (error) {
                console.log(error)
                res.sendStatus(400)
            }
    }) 
}