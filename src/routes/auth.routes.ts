import express, { Router } from 'express'
import { User } from '../models/User.model'
import bcrypt from 'bcrypt'
import { getErrorMessage } from '../utils/getErrorMessage';

export default (router: express.Router) => {

    router.post('/login', async (req: express.Request, res: express.Response) => {

        const { name, password } = req.body
        
            try {
        
                const foundUser = await User.findOne({ name: name });
                const isMatch = bcrypt.compareSync(password, foundUser.password);
        
                if (!foundUser) {
                    throw new Error('Name of user is not correct');
                }

                if (!isMatch) {
                    throw new Error('Password is not correct');
                } else {
                    return res.status(200).send(foundUser).json(foundUser);
                }
              
            } catch (error) {
              return res.status(500).send(getErrorMessage(error));
            }

    })

    router.post('/register', async (req: express.Request, res: express.Response) => {

        const { name, password } = req.body
    
        try {
            const newUser = new User({
                name, password
            })

            res.status(200).send('Inserted successfully').json(newUser)

        } catch (error) {
            res.status(500).send(getErrorMessage(error));
        }

        })

}