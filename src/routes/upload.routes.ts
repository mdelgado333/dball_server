import express from 'express'
import { upload, uploadToCloudinary } from '../config/cloudinary.config'
import { imageUpload } from '../controllers/upload.controller'

export default (router: express.Router) => {
    router.post('/upload', upload.array('images', 5), uploadToCloudinary, imageUpload)
}