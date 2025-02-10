import express from 'express'
import { User} from '../models/User.model'
import { auth } from '../middleware/auth.middleware'

export default (router: express.Router) => {

    router.get('/users', auth, async (req: express.Request, res: express.Response) => {

        try {

            const users = await User.find()
            res.status(200).json(users)
            
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }

    })

    router.patch('/users/:id', auth, async (req: express.Request, res: express.Response) => {
        
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

    router.delete('/users/:id', auth, async (req: express.Request, res: express.Response) => {
        
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