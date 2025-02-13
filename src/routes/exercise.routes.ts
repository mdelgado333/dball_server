import express from "express"
import { Exercise } from '../models/exercise.model'

export default (router: express.Router) => {

    router.get('/exercises', async (req: express.Request, res: express.Response) => {

        const { page = 1, limit = 10 } = req.query; 

        try {

            const [exercises, totalCount] = await Promise.all([
                Exercise.find()
                    .skip((Number(page) - 1) * Number(limit))
                    .limit(Number(limit)),
                Exercise.countDocuments()
            ])

            res.status(200).json({ exercises, totalCount })

        } catch (error) {
            console.log('Error fetching all exercises: ', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }
    })

    router.get('/exercises/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params

        try {
            const exercise = await Exercise.findById(id)

            !exercise
                ? res.status(404).json({ message: 'Exercise not found' })
                : res.status(200).json(exercise)

        } catch (error) {
            console.log('Error fetching exercise: ', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }

    })

    router.post('/exercises/newExercise', async (req: express.Request, res: express.Response) => {

        const {title, subtitle, description, sets, reps, minutes, seconds, vertical, typeOfContent } = req.body


        if (!title || !subtitle || !description || !sets || !reps || !minutes || !seconds || !vertical || !typeOfContent) {
            return res.status(400).json({ message: 'All fields are required: title, subtitle, description, vertical, typeOfContent' });
        }
    
        const validVerticals = ['ACADEMY', 'VERT'];
        if (!validVerticals.includes(vertical)) {
            return res.status(400).json({ message: 'Invalid value for vertical. Expected "ACADEMY" or "VERT".' });
        }
    
        const validContentTypes = ['SHOOTING', 'DRIBBLING', 'FINISHING', 'ISO', 'POST', 'LOWER', 'UPPER', 'CARDIO'];
        if (!validContentTypes.includes(typeOfContent)) {
            return res.status(400).json({ message: 'Invalid value for typeOfContent. Choose from: SHOOTING, DRIBBLING, FINISHING, etc.' });
        }


        try {

            const newExercise = await Exercise.create({
                info:{ title, subtitle, description },
                details:{ sets, reps, rest: { minutes, seconds } },
                dballInfo: { vertical, typeOfContent }
            })

            res.status(201).json({
                message: 'Exercise created successfully: ',
                exercise: newExercise
            })
            
        } catch (error) {
            console.log('Error creating exercise: ', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
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

            !updatedExercise
                ? res.status(404).json({ message: 'Exercise not found' })
                : res.status(200).json({ message: 'Exercise updated successfully: ', updatedExercise })
        
        } catch (error) {
            console.log('Error updating exercise: ', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }
    }) 

    router.delete('/exercises/:id', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        
            try {

                const deletedExercise = await Exercise.findOneAndDelete({_id: id})

                !deletedExercise
                    ? res.status(404).json({ message: 'Exercise not found'})
                    : res.status(200).json({message: 'Exercise deleted successfully: ', deletedExercise})

            } catch (error) {
                console.log('Error deleting exercise: ', error)
                res.status(500).json({ message: 'Internal server error' })
            }
    }) 

    router.get('/exercises/categories', async (req: express.Request, res: express.Response) => {
        try {
            const categories = await Exercise.distinct('dballInfo.typeOfContent');
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching categories', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

}