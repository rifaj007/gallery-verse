import { Model, model, models, Schema } from "mongoose";

export interface IImage {
  _id: string;
  title: string;
  tags: Array<string>;
  img_url: Array<string>;
}

const imageSchema = new Schema<IImage>(
  {
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    img_url: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Image: Model<IImage> =
  models?.Image || model<IImage>("Image", imageSchema);

export default Image;
