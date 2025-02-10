import express from 'express'
import { isAuthenticated, isOwner } from '../middlewares/index.middleware'
import { User } from '../models/User.model'

export default (router: express.Router) => {

    router.get('/users', /*isAuthenticated,*/ async (req: express.Request, res: express.Response) => {

        try {

            const users = await User.find()
            res.status(200).json(users)
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.patch('/users/:id', /*isAuthenticated, isOwner,*/ async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
        const { username } = req.body

        try {

            const user = await User.findByIdAndUpdate(id, {
                username: username
            }, { new: true })

            res.status(200).json(user).end()
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.delete('/users/:id', /*isAuthenticated, isOwner,*/ async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params

        try {

            const deletedUser = await User.findOneAndDelete({ _id: id })
            res.status(200).json(deletedUser)
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })
}