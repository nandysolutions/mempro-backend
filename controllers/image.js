import cloudinary from 'cloudinary';

export async function createImageUpload(req, res) {
    const timestamp = new Date().getTime()
    const signature = await cloudinary.utils.api_sign_request(
        {
            timestamp,
        },
        process.env.CLOUDINARY_SECRET
    )
    res.status(201).json({ signature, timestamp })
}