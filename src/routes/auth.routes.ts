import express, { Router } from 'express'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { getErrorMessage } from '../utils/getErrorMessage';

export default (router: express.Router) => {

    router.post('/auth/register', async (req: express.Request, res: express.Response) => {

        const { email, password } = req.body
        const salt = 13
        const hash = await bcrypt.hash(password, salt)

        try {
            const newUser = await User.create({
                email,
                password: hash
            })

            const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET!, {
                expiresIn: '1h', // expiration time (1 hour)
            });

            res.status(200).json({ token, newUser })

        } catch (error) {
            res.status(500).send(getErrorMessage(error));
        }

    })

    router.post('/auth/login', async (req: express.Request, res: express.Response) => {
        const { email, password } = req.body;
    
        try {
            console.log("Login attempt for email:", email); // Log the email for debugging
    
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                console.error('User not found');
                return res.status(400).json({ message: 'Invalid email or password' });
            }
    
            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.error('Password mismatch');
                return res.status(400).json({ message: 'Invalid email or password' });
            }
    
            // Generate JWT token
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
                expiresIn: '1h', // expiration time (1 hour)
            });
    
            console.log('Login successful, sending token');
            return res.status(200).json({ token, user }); // Send token and user
        } catch (error) {
            console.error('Error during login:', error); // Log the full error
            return res.status(500).json({ message: getErrorMessage(error) }); // Send detailed error message
        }
    });
    

}