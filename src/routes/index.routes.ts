import express from 'express'

import authentication from './auth.routes'
import users from './user.routes'
import exercises from './exercise.routes'
import workouts from './workout.routes'
import microlearnings from './microlearning.routes'
import courses from './course.routes'
import trainingcycles from './trainingcycle.routes'
import units from './unit.routes'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    users(router)
    exercises(router)
    workouts(router)
    microlearnings(router)
    courses(router)
    trainingcycles(router)
    units(router)
    return router
}