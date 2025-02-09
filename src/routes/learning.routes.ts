import express from 'express'
import { Learning } from '../models/Learning.model'

export default (router: express.Router) => {

    router.post('/learnings/newLearning', async (req: express.Request, res: express.Response) => {

        const { title, subtitle, description, vertical, typeOfContent } = req.body

        try {
            
            const newLearning = new Learning({
                info: { title,
                        subtitle,
                        description
                        },
                dballInfo: {
                        vertical,
                        typeOfContent
                        }
            })
        
            await newLearning.save()
            return res.status(200).json(newLearning)

        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.get('/learnings/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        
            try {
        
                const learning = await Learning.findById(id)
                return res.status(200).json(learning)
        
            } catch (error) {
        
                console.log(error)
                res.sendStatus(400)
        
            }
    })

    router.get('/learnings', async (req: express.Request, res: express.Response) => {

        try {
        
                const learnings = await Learning.find()
                return res.status(200).json(learnings)
        
            } catch (error) {
        
                console.log(error)
                res.sendStatus(400)
        
            }

    })

    router.patch('/learnings/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { title, subtitle, description, vertical, typeOfContent } = req.body

        try {

            const updatedLearning = await Learning.findByIdAndUpdate( id, {
                info: { title,
                    subtitle,
                    description
                },
                dballInfo: {
                    vertical,
                    typeOfContent
                }
            }, {new: true})

            updatedLearning.save()

            return res.status(200).json(updatedLearning)

        } catch (error) {

            console.log(error)
            res.sendStatus(400)

        }

    })



    router.delete('/learnings/:id', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
    
        try {
    
            const deletedLearning = await Learning.findOneAndDelete({ _id: id })
            return res.status(200).json(deletedLearning)
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    })
}