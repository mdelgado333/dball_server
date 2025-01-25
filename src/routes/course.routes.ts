import express from 'express'
import { newCourse, getCourse, getAllCourses, updateCourse, addMicroLearningToCourse, deleteMicroLeraningFromCourse, deleteCourse } from "../controllers/course.controller"

export default (router: express.Router) => {
    router.post('/courses/newCourse', newCourse)
    router.get('/courses/:id', getCourse)
    router.get('/courses', getAllCourses)
    router.patch('/courses/:id', updateCourse)
    router.patch('/courses/:id/addMicroLearningToCourse', addMicroLearningToCourse)
    router.patch('/courses/:id/deleteMicroLearningFromCourse', deleteMicroLeraningFromCourse)
    router.delete('/courses/:id', deleteCourse)
}