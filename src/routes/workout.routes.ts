import express from "express"
import { Workout } from "../models/workout.model"
import { Exercise } from '../models/exercise.model'

export default (router: express.Router) => {

    router.post('/workouts/newWorkout', async (req: express.Request, res: express.Response) => {

        const { title, subtitle, description, vertical, typeOfContent } = req.body

        try {        

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

            const newWorkout = await Workout.create({
                info:{ title, subtitle, description },
                dballInfo: { vertical, typeOfContent }
            })

            res.status(201).json({
                message: 'Workout created successfully',
                workout: newWorkout
            })

            } catch (error) {
                console.log('Error creating workout', error)
                res.sendStatus(500).json({ message: 'Internal server error' })
            }

    })

    router.get('/workouts/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params

        try {
                const workout = await Workout.findById(id)
                    .populate('arrayOfExercises', 'info title')
                    .exec()

                !workout
                    ? res.status(404).json({ message: 'Workout not found' })
                    : res.status(200).json(workout)

            } catch (error) {
                console.log('Error fetching workout:', error)
                res.status(500).json({ message: 'Internal Server Error' })
            }

    })

    router.get('/workouts', async (req: express.Request, res: express.Response) => {
       
        const { page = 1, limit = 10 } = req.query

        try {

                const [workouts, totalCount] = await Promise.all([
                    Workout.find()
                        .skip((Number(page) - 1) * Number(limit))
                        .limit(Number(limit)),
                    Workout.countDocuments()
                ])

                res.status(200).json({ workouts, totalCount })

            } catch (error) {
                console.log('Error when fetching all workouts', error)
                res.sendStatus(400).json({ message: 'Internal server error' })
            }
    })

    router.patch('/workouts/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { title, subtitle, description, vertical, typeOfContent } = req.body

        try {

            const updatedWorkout = await Workout.findByIdAndUpdate(id, {
                info:{ title, subtitle, description },
                dballInfo: { vertical, typeOfContent }
            }, { new: true })

            !updatedWorkout
                ? res.status(404).json({ message: 'Workout not found' })
                : res.status(200).json({ message: 'Workout updated successfully', updatedWorkout})

        } catch (error) {
            console.log('Error updating workout', error)
            return res.sendStatus(500).json({ message: 'Internal server error' })
        }

    })

    router.patch('/workouts/:id/addExercise', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { exercise } = req.body

        try {

            const exerciseId = await Exercise.findById(exercise)
            if (!exerciseId) res.status(404).json({ message: 'Exercise not found' })

            const updatedWorkout = await Workout.findByIdAndUpdate(id, {
                $push : { exercises: exercise }
            }, { new: true })        

            !updatedWorkout
                ? res.status(404).json({ message: 'Workout not found' })
                : res.status(200).json({ messsage: 'Exercise added to workout successfully', updatedWorkout })

            } catch (error) {
                console.log('Error addng exercise to workout', error)
                res.sendStatus(500).json({ message: 'Internal server error' })
            }

    })

    router.patch('/workouts/:id/deleteExercise', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { idx } = req.body

        try {
            
                const updatedWorkout = await Workout.findById(id)

                if (!updatedWorkout) res.status(404).json({ message: 'Workout not found' })

                if (idx < 0 || idx >= updatedWorkout.exercises.length) {
                    return res.status(400).json({ message: 'Invalid index' });
                }

                updatedWorkout.exercises.splice(idx, 1)
                await updatedWorkout.save()
        
                res.status(200).json({ message: 'Exercise deleted from workout successfully', updatedWorkout })

            } catch (error) {
                console.log('Error deleting exercise from workout', error)
                res.sendStatus(500).json({ message: 'Internal server error' })
            }

    })

    router.delete('/workouts/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params

        try {

                const deletedWorkout = await Workout.findOneAndDelete({ _id: id })
                !deletedWorkout
                    ? res.status(404).json({ message: 'Workout not found' })
                    : res.status(200).json({ message: 'Workout successfully deleted', deletedWorkout })
                
            } catch (error) {
                console.log('Error deleting workout: ', error)
                res.sendStatus(400).json({ message: 'Internal server error'})
            }

    })

}