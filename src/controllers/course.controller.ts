import express from 'express'
import { createCourse, getCourseById, getCourses, updateCourseById, deleteCourseById } from '../helpers/course.helper'
import { getWorkoutById } from 'helpers/workout.helper'

export const newCourse = async (req: express.Request, res: express.Response) => {
    const { title, subtitle, description, vertical, typeOfContent, microlearning1 } = req.body
    try {
        const course = await createCourse({
            info:{
                title,
                subtitle,
                description
            },
            dballInfo: {
                vertical,
                typeOfContent
            },
            arrayOfMicroLearnings: [ microlearning1 ]
        })
        res.status(200).json(course)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const getCourse = async (req: express.Request, res: express.Response) => {
    const { id } = req. params
    try {
        const course = await getCourseById(id)
        res.status(200).json(course)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const getAllCourses = async (req: express.Request, res: express.Response) => {
    try {
        const courses = await getCourses()
        res.status(200).json(courses)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}

export const updateCourse = async (req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { title, subtitle, description, vertical, typeOfContent } = req.body

    try {

        const updatedCourse = await getCourseById(id)

        updatedCourse.info.title = title
        updatedCourse.info.subtitle = subtitle
        updatedCourse.info.subtitle = description

        updatedCourse.dballInfo.vertical = vertical
        updatedCourse.dballInfo.typeOfContent = typeOfContent

        updatedCourse.save()

        return res.status(200).json(updatedCourse)

    } catch (error) {

        console.log(error)
        res.sendStatus(400)

    }
}

export const addMicroLearningToCourse = async (req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { newMicroLearning } = req.body

    try {

        const updatedCourse = await getCourseById(id)
        updatedCourse.arrayOfMicroLearnings.push(newMicroLearning)
        updatedCourse.save()

        return res.status(200).json(updateCourse)
        
    } catch (error) {
        
        console.log(error)
        res.sendStatus(400)
    }
}

export const deleteMicroLeraningFromCourse = async (req: express.Request, res: express.Response) => {

    const { id } = req.params
    const { idx } = req.body

    try {

        const updatedCourse = await getCourseById(id)
        updatedCourse.arrayOfMicroLearnings.splice(idx, 1)
        updatedCourse.save()
        
    } catch (error) {
        
        console.log(error)
        res.sendStatus(400)

    }
}

export const deleteCourse = async (req: express.Request, res: express.Response) => {

    const { id } = req.params

    try {

        const deletedCourse = await deleteCourseById(id)
        return res.status(200).json(deletedCourse)

    } catch (error) {
        
        console.log(error)
        res.sendStatus(400)
    }
}