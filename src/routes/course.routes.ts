import express from 'express'
import { Course } from '../models/Course.model'

export default (router: express.Router) => {

    router.post('/courses/newCourse', async (req: express.Request, res: express.Response) => {

        const { title, subtitle, description, vertical, typeOfContent } = req.body

        try {
            const newCourse = new Course({
                info: { title, subtitle, description },
                dballInfo: { vertical, typeOfContent }
            })

            await newCourse.save()
            res.status(200).json(newCourse)

        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.get('/courses/:id', async (req: express.Request, res: express.Response) => {
        
        const { id } = req. params

        try {
            const course = await Course.findById(id)
            res.status(200).json(course)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    })

    router.get('/courses', async (req: express.Request, res: express.Response) => {
        
        try {
            const courses = await Course.find()
            res.status(200).json(courses)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
    })

    router.patch('/courses/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { title, subtitle, description, vertical, typeOfContent } = req.body
        
        try {
    
            const updatedCourse = await Course.findByIdAndUpdate( id, {
                info: { title, subtitle, description },
                dballInfo: { vertical, typeOfContent }
            }, { new: true })
    
            res.status(200).json(updatedCourse)
    
        } catch (error) {
    
            console.log(error)
            res.sendStatus(400)
    
        }

    })

    router.patch('/courses/:id/addUnit', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { newUnit } = req.body
        
        try {
    
            const updatedCourse = await Course.findByIdAndUpdate(id, {
                $push: { units: newUnit }
            }, { new: true })
    
            res.status(200).json(updatedCourse)
            
        } catch (error) {
            
            console.log(error)
            res.sendStatus(400)
        }
    })

    router.patch('/courses/:id/deleteUnit', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { idx } = req.body
    
        try {
    
            const updatedCourse = await Course.findById(id)
            updatedCourse.units.splice(idx, 1)
            await updatedCourse.save()

            res.status(200).json(updatedCourse)

        } catch (error) {
            
            console.log(error)
            res.sendStatus(400)
    
        }
    })

    router.delete('/courses/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        
        try {
    
            const deletedCourse = await Course.findOneAndDelete({ _id: id })
            res.status(200).json(deletedCourse)
    
        } catch (error) {
            
            console.log(error)
            res.sendStatus(400)
        }

    })
}