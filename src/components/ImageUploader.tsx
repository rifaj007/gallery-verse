'use client';
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

import { Box, Button } from "@mui/material";

export default function ImageUploader() {
  return (
    <>
    <Box sx={{ my: 2 }} border={"brown"}>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          window.location.reload();
        }}
        onUploadError={(error: Error) => alert(`Upload failed: ${error.message}`)}
      />
    </Box>

    {/* <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </section> */}
    </>
  );
}
