import express from 'express'
import {upload, uploadToCloudinary } from '../config/cloudinary.config'; //the file path where you had written this functions in earlier

export default (router: express.Router) => {

    router.post("/upload", upload.array('images', 5),  uploadToCloudinary, async (req: express.Request, res: express.Response) => {
        
        const { cloudinaryUrls } = req.body

        try {
            if (cloudinaryUrls.length === 0) {
                console.error('No Cloudinary URLs found.');
                return res.status(500).send('Internal Server Error');
            }
           const images = cloudinaryUrls;
           return res.send(images)
    
        } catch (error) {
            console.log(error)
            res.sendStatus(500).json(error)
        }
    });

}