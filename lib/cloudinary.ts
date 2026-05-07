import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadImage(file: string, folder = 'portfolio') {
	const res = await cloudinary.uploader.upload(file, {
		folder,
		transformation: [{ quality: 'auto', fetch_format: 'auto' }],
	});

	return { url: res.secure_url, publicId: res.public_id };
}
