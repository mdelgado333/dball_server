import express from "express"
import { Workout } from "../models/workout.model"

export default (router: express.Router) => {

    router.post('/workouts/newWorkout', async (req: express.Request, res: express.Response) => {

        const { title, subtitle, description, vertical, typeOfContent } = req.body

        try {        
                const newWorkout = new Workout({
                    info:{ title, subtitle, description },
                    dballInfo: { vertical, typeOfContent }
                    })

                await newWorkout.save()
                return res.status(200).json(newWorkout)

            } catch (error) {
                console.log(error)
                res.sendStatus(400)
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
       
        try {
            console.log("Received request at /workouts");  // Log request to see if it's being hit


                const workouts = await Workout.find()
                return res.status(200).json(workouts)

            } catch (error) {
                console.log(error)
                res.sendStatus(400)
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

            return res.status(200).json(updatedWorkout)

        } catch (error) {
            console.log(error)
            return res.sendStatus(400)
        }

    })

    router.patch('/workouts/:id/addExercise', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { newExercise } = req.body

        try {
                
        
                const updatedWorkout = await Workout.findByIdAndUpdate(id, {
                    $push : { arrayOfExercises: newExercise }
                }, { new: true })        

                return res.status(200).json(updatedWorkout)

            } catch (error) {
                console.log(error)
                res.sendStatus(400)
            }

    })

    router.patch('/workouts/:id/deleteExercise', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { idx } = req.body

        try {
            
                const updatedWorkout = await Workout.findById(id)
        
                updatedWorkout.arrayOfExercises.splice(idx, 1)
                await updatedWorkout.save()
        
                return res.status(200).json(updatedWorkout)

            } catch (error) {
                console.log(error)
                res.sendStatus(400)
            }

    })

    router.delete('/workouts/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params

        try {

                const deletedWorkout = await Workout.findOneAndDelete({ _id: id })
                return res.json(deletedWorkout)
                
            } catch (error) {
                console.log(error)
                res.sendStatus(400)
            }

    })

}