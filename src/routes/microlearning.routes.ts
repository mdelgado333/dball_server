import express from 'express'
import { deleteMicroLearning, getAllMicrolearnings, getMicrolearning, newMicroLearning, updateMicroLearning } from '../controllers/microlearning.controller'

export default (router: express.Router) => {
    router.post('/microlearnings/newMicroLearning', newMicroLearning)
    router.get('/microlearnings/:id', getMicrolearning)
    router.get('/microlearnings', getAllMicrolearnings)
    router.patch('microlearnings/:id', updateMicroLearning)
    router.delete('microlearnings/:id', deleteMicroLearning)
}