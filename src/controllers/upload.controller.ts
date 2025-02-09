import express from "express";

export const imageUpload = async (req: express.Request, res: express.Response) => {
    try {
        const cloudinaryUrls = req.body.cloudinaryUrls;
        if (cloudinaryUrls.length === 0) {
            console.error('No Cloudinary URLs found.');
            return res.status(500).send('Internal Server Error');
        }
       const images = cloudinaryUrls;
       return res.send(images)

    } catch (error) {
        return res.status(500).json({ error});
    }
}