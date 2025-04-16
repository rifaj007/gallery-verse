import { array, object, string } from "zod";

export const uploadImageFormValidationSchema = object({
    title: string().nonempty("Title is required"),
    tags: array(string()).min(1, "At least one tag is required"),
    img_url: array(string().url()).min(1, "At least one image is required"),
})