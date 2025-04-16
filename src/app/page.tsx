"use client";
import AddImageForm from "@/components/AddImageForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageGrid from "@/components/ImageGrid";
import { Container } from "@mui/material";
import { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Container>
        <main className="flex-1">
          <AddImageForm />
          <ImageGrid searchQuery={searchQuery} />
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
