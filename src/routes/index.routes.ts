import express from 'express'

import authentication from './auth.routes'
import users from './user.routes'
import exercises from './exercise.routes'

const router = express.Router()

export default (): express.Router => {
    authentication(router)
    users(router)
    exercises(router)
    return router
}