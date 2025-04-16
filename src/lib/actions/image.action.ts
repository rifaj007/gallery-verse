"use server";
import connectToDatabase from "../database/dbConnect";
import Image from "../database/models/image.model";
import { handleError } from "../utils";

interface CreateImageProps {
  title: string;
  tags: Array<string>;
  img_url: Array<string>;
}

// create a new image
export const createImage = async (image: CreateImageProps) => {
  try {
    await connectToDatabase();

    const newImage = await Image.create(image);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
};

// get all images
export const getImagesPaginated = async (page = 1, limit = 2) => {
  try {
    const skip = (page - 1) * limit;

    const images = await Image.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Image.countDocuments();
    const hasMore = skip + images.length < total;

    return {
      images: images.map((img) => ({ ...img, _id: img._id.toString() })),
      hasMore,
    };
  } catch (error) {
    console.error("Pagination error:", error);
    return { images: [], hasMore: false };
  }
};

// handle image delete
export const deleteImage = async (id: string, index: number) => {
  try {
    await connectToDatabase();

    const imageDoc = await Image.findById(id);
    if (!imageDoc) throw new Error("Image not found");

    imageDoc.img_url.splice(index, 1);
    await imageDoc.save();

    if (imageDoc.img_url.length === 0) {
      await Image.findByIdAndDelete(id);
    }

    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};
