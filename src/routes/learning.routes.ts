import express from 'express'
import { Learning } from '../models/Learning.model'

export default (router: express.Router) => {

    router.post('/learnings/newLearning', async (req: express.Request, res: express.Response) => {

        const { title, subtitle, description, vertical, typeOfContent } = req.body

        if (!title || !subtitle || !description || !vertical || !typeOfContent) {
            return res.status(400).json({ message: 'All fields are required: title, subtitle, description, vertical, typeOfContent' });
        }
    
        const validVerticals = ['ACADEMY', 'VERT'];
        if (!validVerticals.includes(vertical)) {
            return res.status(400).json({ message: 'Invalid value for vertical. Expected "ACADEMY" or "VERT".' });
        }
    
        const validContentTypes = ['SHOOTING', 'DRIBBLING', 'FINISHING', 'ISO', 'POST', 'LOWER', 'UPPER', 'CARDIO'];
        if (!validContentTypes.includes(typeOfContent)) {
            return res.status(400).json({ message: 'Invalid value for typeOfContent. Choose from: SHOOTING, DRIBBLING, FINISHING, etc.' });
        }

        try {
            
            const newLearning = await Learning.create({
                info: { title, subtitle, description },
                dballInfo: { vertical, typeOfContent }
            })
        
            res.status(201).json({
                message: 'Learning created successfully',
                learning: newLearning 
            })

        } catch (error) {
            console.log('Error creating learning:', error)
            res.sendStatus(500).json({ message: 'Internal server error' })
        }

    })

    router.get('/learnings/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        
        try {
    
            const learning = await Learning.findById(id)

            !learning 
                ? res.status(404).json({ message: 'Learning not found' })
                : res.status(200).json(learning);
    
        } catch (error) {

            console.error('Error fetching learning:', error);
            res.status(500).json({ message: 'Internal server error' });
    
        }
    })

    router.get('/learnings', async (req: express.Request, res: express.Response) => {

        const { page = 1, limit = 10 } = req.query; 

        try {
            
            const [learnings, totalCount] = await Promise.all([
                Learning.find()
                    .skip((Number(page) - 1) * Number(limit))
                    .limit(Number(limit)),
                Learning.countDocuments()
            ]);
            
            res.status(200).json({ learnings, totalCount });

        } catch (error) {
            console.error('Error fetching all learnings:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    })

    router.patch('/learnings/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { title, subtitle, description, vertical, typeOfContent } = req.body

        try {

            const updatedLearning = await Learning.findByIdAndUpdate( id, {
                info: { title,
                    subtitle,
                    description
                },
                dballInfo: {
                    vertical,
                    typeOfContent
                }
            }, {new: true})

            !updatedLearning
                ? res.status(404).json({ message: 'Learning not found' })
                : res.status(200).json({ message: 'Learning updated successfully', updatedLearning });

        } catch (error) {

            console.error('Error updating learning:', error);
            res.status(500).json({ message: 'Internal server error' })

        }

    })



    router.delete('/learnings/:id', async (req: express.Request, res: express.Response) => {
        
        const { id } = req.params
    
        try {
    
            const deletedLearning = await Learning.findOneAndDelete({ _id: id })
            
            !deletedLearning
                ? res.status(404).json({ message: 'Learning not found' })
                : res.status(200).json({ message: 'Learning successfully deleted', deletedLearning })
            
        } catch (error) {
            console.error('Error deleting learning:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    })

    // router.patch('/learnings/:id/rate', async (req: express.Request, res: express.Response) => {
    //     const { id } = req.params;
    //     const { rating } = req.body;
    
    //     try {
    //         const learning = await Learning.findById(id);
    
    //         if (!learning) {
    //             return res.status(404).json({ message: 'Learning not found' });
    //         }
    
    //         learning.rating = rating; // Assuming rating field exists or you calculate an average rating
    //         await learning.save();
    
    //         return res.status(200).json(learning);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Error rating learning' });
    //     }
    // });

    // router.get('/learnings/top-rated', async (req: express.Request, res: express.Response) => {
    //     try {
    //         const topRatedLearnings = await Learning.find().sort({ rating: -1 }).limit(5); // Adjust limit as needed
    //         return res.status(200).json(topRatedLearnings);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Error fetching top-rated learnings' });
    //     }
    // });

    //THIS ONE BELOW DOESNT WORKKKK DUE TO INVALID ID
    //input must be a 24 character hex string, 12 byte Uint8Array, or an integer

    router.get('/learnings/recent', async (req: express.Request, res: express.Response) => {
        console.log('Recent learnings route hit');
        try {
            const recentLearnings = await Learning.find().sort({ createdAt: -1 }).limit(3); // Adjust limit as needed
            return res.status(200).json(recentLearnings);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching recent learnings' });
        }
    });

    // router.get('/search/learnings', async (req: express.Request, res: express.Response) => {
    //     const { query } = req.query;
    
    //     try {
    //         const results = await Learning.find({
    //             $text: { $search: query }
    //         });
    //         return res.status(200).json(results);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Error searching learnings' });
    //     }
    // });

    router.get('/categories/learnings', async (req: express.Request, res: express.Response) => {
        try {
            const categories = await Learning.distinct('dballInfo.typeOfContent');
            return res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching categories' });
        }
    });

}