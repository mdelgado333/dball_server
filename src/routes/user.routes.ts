import express from 'express'

import { deleteUser, getAllUsers, updateUser } from '../controllers/user.controller'
import { isAuthenticated, isOwner } from '../middlewares/index.middleware'

export default (router: express.Router) => {
    router.get('/users', /*isAuthenticated,*/ getAllUsers)
    router.patch('/users/:id', /*isAuthenticated, isOwner,*/ updateUser)
    router.delete('/users/:id', /*isAuthenticated, isOwner,*/ deleteUser)
}

// el isAuthenticated esta rarillo