import ImageGrid from "@/components/ImageGrid";
import ImageUploader from "@/components/ImageUploader";
import { getAllImages, deleteImageById } from "@/lib/actions"; // custom actions to fetch/delete
import { Container } from "@mui/material";

const Home = async () => {
  const images = await getAllImages(); // Fetch from your backend or UploadThing metadata

  return (
    
      <Container>
        <ImageUploader />
        <ImageGrid images={images} onDelete={deleteImageById} />
      </Container>

  );
};

export default Home;
