import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

export const uploadAssetToCloudinary = async (file: Express.Multer.File) => {
  const { path } = file;
  const uploaded = await cloudinary.uploader.upload(path, {
    folder: "chatapp",
    resource_type: "auto",
    use_asset_folder_as_public_id_prefix: true,
  });
  return uploaded;
};
