// components/ImageModal.tsx
import { Dialog, DialogContent } from "@mui/material";

export default function ImageModal({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) {
  return (
    <Dialog open={Boolean(imageUrl)} onClose={onClose} maxWidth="md">
      <DialogContent>
        <img src={imageUrl} alt="Preview" style={{ width: "100%" }} />
      </DialogContent>
    </Dialog>
  );
}
