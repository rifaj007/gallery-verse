import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "@uploadthing/react/styles.css";
import { Toaster } from "react-hot-toast";
import { ImageProvider } from "@/components/ImageContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gallery Verse | Image Upload & Gallery App",
  description:
    "Gallery Verse is a responsive image gallery built with Next.js, TypeScript, and Material UI. Upload, preview, and manage your images with cloud storage, search, pagination, and delete functionality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="flex flex-col min-h-screen">
        <ImageProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeRegistry>
              {children}
              <Toaster />
            </ThemeRegistry>
          </AppRouterCacheProvider>
        </ImageProvider>
      </body>
    </html>
  );
}
