import express from 'express'
import { Course } from '../models/Course.model'
import { Unit } from '../models/Unit.model'

export default (router: express.Router) => {

    router.post('/courses/newCourse', async (req: express.Request, res: express.Response) => {

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
            const newCourse = await Course.create({
                info: { title, subtitle, description },
                dballInfo: { vertical, typeOfContent }
            })

            res.status(201).json({
                message: 'Course created successfully',
                Course: newCourse
            })

        } catch (error) {
            console.log('Error creating course', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }

    })

    router.get('/courses/:id', async (req: express.Request, res: express.Response) => {
        
        const { id } = req. params

        try {

            const course = await Course.findById(id)
                .populate('units', 'info title')
                .exec()

            !course
                ? res.status(404).json({ message: 'Course not found' })
                : res.status(200).json({
                    message: 'Course fetched successfully',
                    course: course
                })

        } catch (error) {
            console.log('Error fetching course', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }
    })

    router.get('/courses', async (req: express.Request, res: express.Response) => {
        
        const { page = 1, limit = 10 } = req.query; 

        try {
            const [courses, totalCount] = await Promise.all([
                Course.find()
                    .skip((Number(page) - 1) * Number(limit))
                    .limit(Number(limit)),
                Course.countDocuments()
            ])

            res.status(200).json({courses, totalCount})

        } catch (error) {
            console.log('Error fetching all courses', error)
            res.status(500).json({ message: 'Internal server error' })
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
    
            !updatedCourse
                ? res.status(404).json({ message: 'Course not found' })
                : res.status(200).json({ message: 'Course updated successfully', updatedCourse})
    
        } catch (error) {
    
            console.log('Error updating course', error)
            res.status(500).json({ message: 'Internal server error' })
    
        }

    })

    router.patch('/courses/:id/addUnit', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { unit } = req.body
        
        try {

            const unitId = await Unit.findById(unit)
            if(!unitId) res.status(404).json({ message: 'Unit not found' })
    
            const updatedCourse = await Course.findByIdAndUpdate(id, {
                $push: { units: unit }
            }, { new: true })
    
            !updatedCourse
                ? res.status(404).json({ message: 'Course not found' })
                : res.status(200).json({ message: 'Unit added to course successfully', updatedCourse })
            
        } catch (error) {
            
            console.log('Error adding unit to course', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    })

    router.patch('/courses/:id/deleteUnit', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { idx } = req.body
    
        try {
    
            const updatedCourse = await Course.findById(id)

            if(!updatedCourse) res.status(404).json({ message: 'Course not found' })

            if (idx < 0 || idx >= updatedCourse.units.length) {
                return res.status(400).json({ message: 'Invalid index' });
            }

            updatedCourse.units.splice(idx, 1)
            await updatedCourse.save()

            res.status(200).json({ message: 'Unit deleted from course successfully', updatedCourse})

        } catch (error) {
            
            console.log('Error deleting unit from course', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
    
        }
    })

    router.delete('/courses/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        
        try {
    
            const deletedCourse = await Course.findOneAndDelete({ _id: id })
            !deletedCourse
                ? res.status(404).json({ message: 'Course not found' })
                : res.status(200).json({ message: 'Course deleted successfully', deletedCourse })
    
        } catch (error) {
            
            console.log('Error deleting course', error)
            res.sendStatus(400).json({ message: 'Internal sever error' })
        }

    })
}