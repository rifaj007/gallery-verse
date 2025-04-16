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
