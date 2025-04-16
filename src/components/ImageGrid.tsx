"use client";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Chip,
  useTheme,
  Skeleton,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { IImage } from "@/lib/database/models/image.model";
import { deleteImage, getImagesPaginated } from "@/lib/actions/image.action";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useInView } from "react-intersection-observer";
import { useImageContext } from "./ImageContext";

type Props = {
  searchQuery: string;
};

const ImageGrid = ({ searchQuery }: Props) => {
  const { refreshKey } = useImageContext();
  const [images, setImages] = useState<IImage[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    imgIndex: number;
  } | null>(null);

  const { ref: loaderRef, inView } = useInView({
    rootMargin: "200px",
    triggerOnce: false,
  });

  const theme = useTheme();

  // fetching all images
  const fetchImages = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const { images: newImages, hasMore: more } = await getImagesPaginated(
      page,
      3
    );

    setImages((prev) => {
      const existingIds = new Set(prev.map((img) => img._id));
      const uniqueNew = newImages.filter(
        (img: IImage) => !existingIds.has(img._id)
      );
      return [...prev, ...uniqueNew];
    });

    setPage((prev) => prev + 1);
    setHasMore(more);
    setLoading(false);
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Infinite scroll trigger
  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchImages();
    }
  }, [inView, hasMore, loading, fetchImages]);

  // Trigger full refresh when refreshKey changes
  useEffect(() => {
    const resetAndFetch = async () => {
      setImages([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);

      const { images: newImages, hasMore: more } = await getImagesPaginated(
        1,
        3
      );
      setImages(newImages);
      setPage(2);
      setHasMore(more);
      setLoading(false);
    };

    resetAndFetch();
  }, [refreshKey]);

  // handling image delete
  const handleDelete = async () => {
    if (deleteTarget) {
      const { id, imgIndex } = deleteTarget;

      const success = await deleteImage(id, imgIndex);
      if (success) {
        setImages((prev) =>
          prev
            .map((img) =>
              img._id === id
                ? {
                    ...img,
                    img_url: img.img_url.filter((_, i) => i !== imgIndex),
                  }
                : img
            )
            .filter((img) => img.img_url.length > 0)
        );
      }

      setDeleteTarget(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 4 }, mt: 2 }}>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        {searchQuery ? `Showing results for "${searchQuery}"` : "All Images"}
      </Typography>

      <Grid container spacing={2}>
        {images
          .filter((image) => {
            const q = searchQuery.toLowerCase();
            const inTitle = image.title.toLowerCase().includes(q);
            const inTags = image.tags.some((tag) =>
              tag.toLowerCase().includes(q)
            );
            return inTitle || inTags;
          })
          .map((image) =>
            image.img_url.map((img, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={`${image._id}-${index}`}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                  }}
                >
                  <img
                    src={img}
                    alt={image.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    onClick={() => setSelectedImage(img)}
                  />
                  <Box sx={{ p: 1 }}>
                    <Typography
                      color="text.secondary"
                      variant="subtitle1"
                      fontWeight="bold"
                    >
                      {image.title}
                    </Typography>
                    <Box
                      sx={{
                        mt: 0.5,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {image.tags.map((tag, i) => (
                        <Chip
                          className="!text-black"
                          key={i}
                          label={tag}
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box
                    className="actions"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => setSelectedImage(img)}
                      color="primary"
                      variant="contained"
                    >
                      <ZoomInIcon />
                    </Button>
                    <Button
                      size="small"
                      onClick={() =>
                        setDeleteTarget({ id: image._id, imgIndex: index })
                      }
                      color="error"
                      variant="contained"
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))
          )}
      </Grid>

      {loading && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 1 }}>
                <Skeleton variant="rectangular" height={200} />
                <Box sx={{ p: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Infinite Scroll Trigger */}
      <div ref={loaderRef} style={{ minHeight: "20px" }} />

      {/* Preview Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
      >
        <Box
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            bgcolor: theme.palette.background.paper,
          }}
        >
          <DialogTitle>Image Preview</DialogTitle>
          <DialogContent>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedImage(null)}>Close</Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <Box
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            bgcolor: theme.palette.background.paper,
          }}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this image?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ImageGrid;
