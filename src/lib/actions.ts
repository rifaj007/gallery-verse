"use server"
import connectToDatabase from "./database/dbConnect";
import Image from "./database/models/image.model";

export const getAllImages = async () => {
  await connectToDatabase();
  const images = await Image.find().sort({ createdAt: -1 });
  return images.map((img) => ({
    id: img._id.toString(),
    url: img.url,
    title: img.title,
  }));
};

export const deleteImageById = async (id: string) => {
  await connectToDatabase();
  await Image.findByIdAndDelete(id);
};
