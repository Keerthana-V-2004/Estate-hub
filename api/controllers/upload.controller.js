import cloudinary from '../utils/cloudinary.js';

export const uploadImage = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.body.image,
      {
        folder: 'real-estate',
      }
    );

    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
    });
    next(error);
  }
};