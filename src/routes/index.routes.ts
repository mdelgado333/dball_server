import express from 'express'
import auth from '../routes/auth.routes'
import users from './user.routes'
import exercises from './exercise.routes'
import workouts from './workout.routes'
import learnings from './learning.routes'
import courses from './course.routes'
import cycles from './cycle.routes'
import units from './unit.routes'
import upload from './upload.routes'

const router = express.Router()

export default (): express.Router => {
    auth(router)
    users(router)
    exercises(router)
    workouts(router)
    learnings(router)
    courses(router)
    cycles(router)
    units(router)
    upload(router)
    return router
}