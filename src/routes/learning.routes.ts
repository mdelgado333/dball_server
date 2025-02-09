import express from 'express'
import { deleteMicroLearning, getAllMicrolearnings, getMicrolearning, newMicroLearning, updateMicroLearning } from '../controllers/learning.controller'

export default (router: express.Router) => {
    router.post('/microlearnings/newMicroLearning', newMicroLearning)
    router.get('/microlearnings/:id', getMicrolearning)
    router.get('/microlearnings', getAllMicrolearnings)
    router.patch('/microlearnings/:id', updateMicroLearning) // funciona pero me pasa el json antes de editar porque he usado findByIdAndUpdate en vez de findById y después lo updateo yo, ya lo arreglaré
    router.delete('/microlearnings/:id', deleteMicroLearning)
}