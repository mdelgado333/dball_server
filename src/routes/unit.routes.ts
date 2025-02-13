import express from 'express'
import { Unit } from '../models/Unit.model'
import { Learning } from '../models/Learning.model'

export default (router: express.Router) => {
    router.post('/units/newUnit', async (req: express.Request, res: express.Response) => {

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
        
                const newUnit = await Unit.create({
                    info: { title, subtitle, description },
                    dballInfo: { vertical, typeOfContent }
                })

                res.status(201).json({
                    message: 'Unit created successfully',
                    learning: newUnit 
                })
                
            } catch (error) {
                console.log(error)
                res.sendStatus(400)
            }

    })

    router.get('/units/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        
            try {
        
                const unit = await Unit.findById(id)
                    .populate('learnings', 'info title')
                    .exec()

                !unit 
                    ? res.status(404).json({ message: 'Unit not found' })
                    : res.status(200).json(unit);
                
            } catch (error) {
                console.error('Error fetching unit:', error);
                res.status(500).json({ message: 'Internal server error' });
            }

    })

    router.get('/units', async (req: express.Request, res: express.Response) => {

        const { page = 1, limit = 10 } = req.query

        try {

            const [units, totalCount] = await Promise.all([
                Unit.find()
                    .skip((Number(page) - 1) * Number(limit))
                    .limit(Number(limit)),
                Unit.countDocuments()
            ]);

            res.status(200).json({ units, totalCount });
        
            } catch (error) {
                console.error('Error fetching all units:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
    })
    
    router.patch('/units/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { title, subtitle, description, vertical, typeOfContent } = req.body
        
        try {
    
            const updatedUnit = await Unit.findByIdAndUpdate(id, {
                info: {
                    title,
                    subtitle,
                    description
                },
                dballInfo: {
                    vertical,
                    typeOfContent
                }
            }, {new: true})

            !updatedUnit
                ? res.status(404).json({ message: 'Unit not found' })
                : res.status(200).json({ message: 'Unit updated successfully', updatedUnit })

        } catch (error) {

            console.error('Error updating unit:', error);
            res.status(500).json({ message: 'Internal server error' })
        }

    })
    
    router.patch('/units/:id/addLearning', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { learning } = req.body

        try {

            const learningId = await Learning.findById(learning)
            if (!learningId) res.status(404).json({ message: 'Learning not found' })

            const updatedUnit = await Unit.findByIdAndUpdate(id, {
                $push: { learnings: learning }
            }, { new: true})

            !updatedUnit
                ? res.status(404).json({ message: 'Unit not found' })
                : res.status(200).json({ message: 'Unit updated successfully', updatedUnit })
        
        } catch (error) {
            console.error('Error updating unit:', error);
            res.status(500).json({ message: 'Internal server error' })
        }

    })
    
    router.patch('/units/:id/deleteLearning', async (req: express.Request, res: express.Response) => {

        const { id } = req.params
        const { idx } = req.body

        try {

            const updatedUnit = await Unit.findById(id);

            if (!updatedUnit) return res.status(404).json({ message: 'Unit not found' });

            if (idx < 0 || idx >= updatedUnit.learnings.length) {
                return res.status(400).json({ message: 'Invalid index' });
            }

            updatedUnit.learnings.splice(idx, 1);
            await updatedUnit.save();

            res.status(200).json({ message: 'Unit updated successfully', updatedUnit });
        
        } catch (error) {
            console.error('Error deleting learning from unit:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    })
    
    router.delete('/units/:id', async (req: express.Request, res: express.Response) => {

        const { id } = req.params

        try {

            const deletedUnit = await Unit.findOneAndDelete({ _id: id })
            !deletedUnit
                ? res.status(404).json({ message: 'Unit not found' })
                : res.status(200).json({ message: 'Learning successfully deleted', deletedUnit})

        } catch (error) {
            console.error('Error deleting unit:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    })
}