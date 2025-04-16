"use client";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadImageFormValidationSchema } from "@/lib/validation";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { ITag } from "@/lib/database/models/tag.model";
import { createTag, getAllTags } from "@/lib/actions/tag.action";
import { createImage } from "@/lib/actions/image.action";
import toast from "react-hot-toast";

/* Custom Input components styled with MUI */
const CustomInput = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f3f6f9",
  color: theme.palette.mode === "dark" ? "white" : "black",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "dark" ? "#2D3843" : "#E0E3E7",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

/* Custom Select components styled with MUI */
const CustomSelect = styled(Select)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f3f6f9",
  color: theme.palette.mode === "dark" ? "#fff" : "#000",
  "& .MuiSelect-icon": {
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
}));

const AddImageForm = () => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const [openTagModal, setOpenTagModal] = useState(false);
  const [availableTags, setAvailableTags] = useState<ITag[]>([]);
  const [newTagName, setNewTagName] = useState("");

  const theme = useTheme();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags: ITag[] = await getAllTags();
        setAvailableTags(allTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, [setAvailableTags]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
    reset,
    trigger,
  } = useForm<z.infer<typeof uploadImageFormValidationSchema>>({
    resolver: zodResolver(uploadImageFormValidationSchema),
    defaultValues: {
      title: "",
      tags: [],
      img_url: [],
    },
  });

  useEffect(() => {
    register("img_url");
  }, [register]);

  /* Handle form submission */
  const onSubmit = async (
    values: z.infer<typeof uploadImageFormValidationSchema>
  ) => {
    console.log(values);
    try {
      await createImage({
        title: values.title,
        tags: values.tags,
        img_url: values.img_url,
      });

      reset();
      toast.success("Image created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to creating image");
    }
  };

  const handleDeleteImage = (url: string) => {
    const updated = getValues("img_url").filter((u) => u !== url);
    setValue("img_url", updated, { shouldValidate: true });
  };

  const handleUploadComplete = (urls: string[]) => {
    const updated = [...getValues("img_url"), ...urls];
    setValue("img_url", updated, { shouldValidate: true });
    trigger("img_url");
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          pl: 2,
          pr: 2,
          pt: 4,
          pb: 4,
          borderRadius: 2,
          mt: 2,
          bgcolor: "background.paper",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Add Image
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          {/* Image Title */}
          <FormControl
            variant="outlined"
            sx={{ flex: 1 }}
            error={!!errors.title}
          >
            <InputLabel htmlFor="title-input">Title</InputLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <CustomInput id="title-input" label="Title" {...field} />
              )}
            />
            <FormHelperText>{errors.title?.message}</FormHelperText>
          </FormControl>

          {/* Image Tags */}
          <FormControl
            variant="outlined"
            sx={{ flex: 1 }}
            error={!!errors.tags}
          >
            <InputLabel id="tags-label">Tags</InputLabel>
            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  labelId="tags-label"
                  multiple
                  input={<CustomInput label="Tags" />}
                  renderValue={(selected) =>
                    Array.isArray(selected) && selected.length > 0
                      ? selected.filter(Boolean).join(", ")
                      : "Select tags"
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                        color: (theme) =>
                          theme.palette.mode === "dark" ? "#fff" : "#000",
                      },
                    },
                  }}
                >
                  {availableTags.map(({ _id, tagName }) => (
                    <MenuItem key={_id} value={tagName}>
                      {tagName}
                    </MenuItem>
                  ))}
                  <MenuItem disabled divider />
                  <MenuItem onClick={() => setOpenTagModal(true)}>
                    ➕ Add New Tag
                  </MenuItem>
                </CustomSelect>
              )}
            />
            <FormHelperText>{errors.tags?.message}</FormHelperText>
          </FormControl>
        </Box>

        {/* Upload Dropzone */}
        <FormControl fullWidth>
          <UploadDropzone<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const urls = res.map((r) => r.ufsUrl);
              handleUploadComplete(urls);
            }}
            onUploadError={(err) => console.error("UploadThing Error:", err)}
            appearance={{
              button: { backgroundColor: "#1976d2", borderRadius: "8px" },
              label: { color: "#333" },
            }}
            config={{}}
          />
          <FormHelperText error={!!errors.img_url}>
            {errors.img_url?.message}
          </FormHelperText>
        </FormControl>

        {/* Image Grid */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {watch("img_url")?.map((url) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={url}>
              <Box
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
                onClick={() => setPreviewImg(url)}
              >
                <Image
                  src={url}
                  alt="uploaded"
                  width={200}
                  height={150}
                  style={{ width: "100%", height: "auto" }}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete(url);
                  }}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Image upload button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: 2 }}
          disabled={isSubmitting}
          fullWidth
        >
          Upload Image
        </Button>
      </Box>

      {/* Image Preview Modal */}
      <Dialog
        open={!!previewImg}
        onClose={() => setPreviewImg(null)}
        maxWidth="md"
      >
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          {previewImg && (
            <Image
              src={previewImg}
              alt="preview"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <Box
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            bgcolor: theme.palette.background.paper,
          }}
        >
          <DialogTitle>Delete Image</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this image?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button
              color="error"
              onClick={() => {
                if (confirmDelete) handleDeleteImage(confirmDelete);
                setConfirmDelete(null);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Add Tag Modal */}
      <Dialog open={openTagModal} onClose={() => setOpenTagModal(false)}>
        <Box
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            bgcolor: theme.palette.background.paper,
          }}
        >
          <DialogTitle>Add New Tag</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel htmlFor="new-tag">Tag Name</InputLabel>
              <CustomInput
                id="new-tag"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                label="Tag Name"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenTagModal(false)}>Cancel</Button>
            <Button
              onClick={async () => {
                const trimmed = newTagName.trim();
                if (!trimmed) return;

                try {
                  const newTag = await createTag(trimmed);
                  if (newTag) {
                    setAvailableTags((prev) => [...prev, newTag]);
                    const current = getValues("tags").filter(Boolean);
                    setValue("tags", [...current, newTag.tagName], {
                      shouldValidate: true,
                    });
                  }

                  setNewTagName("");
                  setOpenTagModal(false);
                } catch (err) {
                  console.error("Failed to create tag:", err);
                }
              }}
              disabled={!newTagName.trim()}
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default AddImageForm;
