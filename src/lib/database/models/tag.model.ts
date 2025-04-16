import { Model, model, models, Schema } from "mongoose";

export interface ITag {
  _id: string;
  tagName: string;
}

const tagSchema = new Schema<ITag>(
  {
    tagName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Tag: Model<ITag> = models?.Tag || model<ITag>("Tag", tagSchema);

export default Tag;
