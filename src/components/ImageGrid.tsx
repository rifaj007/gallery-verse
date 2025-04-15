// components/ImageGrid.tsx
'use client';

import { ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useState } from "react";
import ImageModal from "./ImageModal";

export default function ImageGrid({ images, onDelete }: { images: Image[]; onDelete: (id: string) => void }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <ImageList cols={3} gap={12}>
        {images.map((img) => (
          <ImageListItem key={img.id}>
            <img src={img.url} alt={img.title} loading="lazy" onClick={() => setSelectedImage(img.url)} />
            <ImageListItemBar
              title={img.title}
              actionIcon={
                <IconButton onClick={() => onDelete(img.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
    </>
  );
}
