import cloudinary from "@/config/cloudinary";

export const uploadFileToCloudinary = async (imagePath) => {
    try {
        const response = await cloudinary.uploader.upload(imagePath, {
            folder: process.env.UPLOAD_PRESET
            // upload_preset: process.env.UPLOAD_PRESET
        });

        console.log('res: ', response);
        return response.secure_url;
    } catch (err) {
        console.log('error uploading file to cloudinary', err);
    }
}