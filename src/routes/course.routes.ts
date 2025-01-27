import express from 'express'
import { newCourse, getCourse, getAllCourses, updateCourse, addUnitToCourse, deleteUnitFromCourse, deleteCourse } from "../controllers/course.controller"

export default (router: express.Router) => {
    router.post('/courses/newCourse', newCourse)
    router.get('/courses/:id', getCourse)
    router.get('/courses', getAllCourses)
    router.patch('/courses/:id', updateCourse)
    router.patch('/courses/:id/addUnitToCourse', addUnitToCourse)
    router.patch('/courses/:id/deleteUnitFromCourse', deleteUnitFromCourse)
    router.delete('/courses/:id', deleteCourse)
}