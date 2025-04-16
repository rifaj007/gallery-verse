"use server";

import connectToDatabase from "../database/dbConnect";
import Tag from "../database/models/tag.model";
import { handleError } from "../utils";

// create a new tag
export const createTag = async (tagName: string) => {
  try {
    await connectToDatabase();

    const newTag = await Tag.create({ tagName });

    return JSON.parse(JSON.stringify(newTag));
  } catch (error) {
    handleError(error);
  }
};

// get all tags
export const getAllTags = async () => {
  try {
    await connectToDatabase();

    const tags = await Tag.find({});

    return JSON.parse(JSON.stringify(tags));
  } catch (error) {
    handleError(error);
  }
};
