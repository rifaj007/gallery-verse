"use client";
import React, { createContext, useContext, useState } from "react";

type ImageContextType = {
  refreshKey: number;
  triggerRefresh: () => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <ImageContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within ImageProvider");
  }
  return context;
};
