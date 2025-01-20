import express from 'express'

import authentication from './auth.routes'
import users from './user.routes'
import exercises from './exercise.routes'
import workouts from './workout.routes'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    users(router)
    exercises(router)
    workouts(router)
    return router
}