import express, { Router } from 'express'
import { User } from '../models/User.model'
import bcrypt from 'bcrypt'
import { getErrorMessage } from '../utils/getErrorMessage';

export default (router: express.Router) => {

    router.post('/auth/register', async (req: express.Request, res: express.Response) => {

        const { username, email, password } = req.body
        const salt = 13
        const hash = await bcrypt.hash(password, salt)

        try {
            const newUser = await User.create({
                username,
                email,
                password: hash
            })

            res.status(200).json(newUser)

        } catch (error) {
            res.status(500).send(getErrorMessage(error));
        }

    })

    router.post('/auth/login', async (req: express.Request, res: express.Response) => {

        const { email, password } = req.body
        
            try {
        
                const user = await User.findOne({ email: email });
        
                if (!user) {
                    throw new Error('Name of email is not correct');
                }

                const isMatch = bcrypt.compareSync(password, user.password);

                if (!isMatch) {
                    throw new Error('Password is not correct');
                } else {
                    return res.status(200).json(user);
                }
              
            } catch (error) {
              return res.status(500).send(getErrorMessage(error));
            }

    })

}