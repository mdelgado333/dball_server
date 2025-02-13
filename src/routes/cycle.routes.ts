import express from 'express'
import { Cycle } from '../models/cycle.model'
import { Workout } from '../models/workout.model'

export default(router: express.Router) => {

    router.get('/cycles', async (req: express.Request, res: express.Response) => {

        const { page = 1, limit = 10 } = req.query; 

        try {
        
            const [cycles, totalCount] = await Promise.all([
                Cycle.find()
                    .skip((Number(page) - 1) * Number(limit))
                    .limit(Number(limit)),
                Cycle.countDocuments()
            ])
            
            res.status(200).json({ cycles, totalCount })
            
        } catch (error) {
            console.log('Error fetching all cycles', error)
            res.status(500).json({ message: 'Internal server error' })
        }

    })

    router.post('/cycles/newCycle', async (req: express.Request, res: express.Response) => {
    
        const { title, subtitle, description, vertical, typeOfContent } = req.body
        
        if (!title || !subtitle || !description || !vertical || !typeOfContent) {
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
        
            const newCycle = await Cycle.create({
                info: { title, subtitle, description },
                dballInfo: { vertical, typeOfContent }
            })
    
            res.status(201).json({
                message: 'Cycle created successfully',
                Cycle: newCycle
            })
    
        } catch (error) {
            console.log('Error creating cycle: ', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }
    })

    router.get('/cycles/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        
        try {
            
            const cycle = await Cycle.findById(id)
                .populate('workouts', 'info title')
                .exec()

            !cycle
                ? res.status(404).json({ message: 'Cycle not found' })
                : res.status(200).json(cycle)
    
        } catch (error) {
            console.log('Error fetching unit: ', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
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

            !updatedCycle
                ? res.status(404).json({ message: 'Cycle not found' })
                : res.status(200).json({ message: 'Cycle updated successfully', updatedCycle })
            
        } catch (error) {
            console.log('Error updating cycle' , error)
            res.status(500).json({ message: 'Internal server error' })
        }

    })

    router.patch('/cycles/:id/addWorkout', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { workout } = req.body
    
        try {

            const workoutId = await Workout.findById(workout)
            if(!workoutId) res.status(404).json({ message: 'Workout not found'})
    
            const updatedCycle = await Cycle.findByIdAndUpdate(id, {
                $push : { workouts: workout }
            }, { new: true })
    
            !updatedCycle
                ? res.status(404).json({ message: 'Cycle not found' })
                : res.status(200).json({ message: 'Workout added to cycle successfully', updatedCycle})
    
        } catch (error) {
            console.log('Error adding workout to cycle', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }

    })

    router.patch('/cycles/:id/deleteWorkout', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { idx } = req.body
    
        try {
    
            const updatedCycle = await Cycle.findById(id)
            if (!updatedCycle) res.status(404).json({ message: 'Cycle not found' })

            if (idx < 0 || idx >= updatedCycle.workouts.length) {
                return res.status(400).json({ message: 'Invalid index' });
            }

            updatedCycle.workouts.splice(idx, 1)
            await updatedCycle.save()
    
            res.status(200).json({ message: 'Workout deleted from cycle successfully', updatedCycle })
            
        } catch (error) {
            console.log('Error deleting workout from cycle', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }

    })

    router.delete('/cycles/:id', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        
        try {
            
            const deletedCycle = await Cycle.findOneAndDelete({ _id: id })
            !deletedCycle
                ? res.status(404).json({ message: 'Cycle not found' })
                : res.status(200).json({ message: 'Cycle deleted successfully', deletedCycle })
    
        } catch (error) {
            console.log('Error deleting cycle', error)
            res.sendStatus(400).json({ message: 'Internal server error' })
        }

    })

}