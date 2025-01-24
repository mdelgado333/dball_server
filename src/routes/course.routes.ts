import express from 'express'
import { newCourse, getCourse, getAllCourses, updateCourse, addMicroLearningToCourse, deleteMicroLeraningFromCourse, deleteCourse } from "../controllers/course.controller"

export default (router: express.Router) => {
    router.post('/courses/newCourse', newCourse)
    router.get('/courses/:id', getCourse)
    router.get('/courses', getAllCourses)
    router.post('/courses/:id', updateCourse)
    router.post('/courses/:id/addMicroLearningToCourse', addMicroLearningToCourse)
    router.post('/courses/:id/deleteMicroLearningFromCourse', deleteMicroLeraningFromCourse)
    router.delete('/courses/:id', deleteCourse)
}