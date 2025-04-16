# 📸 GalleryVerse

A modern image gallery web app built with **Next.js 15**, **Tailwind CSS**, **MUI**, and **MongoDB**. Users can upload images with tags, preview them in a responsive grid with infinite scrolling, and search by title or tag. Built with scalability and performance in mind.

## 🚀 Features

- **Image Upload Form**
  - Add a title, assign tags (choose from existing or create new)
  - Upload multiple images via dropzone
  - Preview uploaded images before submission
  - Form validation using **React Hook Form** + **Zod**

- **Gallery View**
  - Infinite scrolling to load images seamlessly
  - Real-time search by title or tags
  - Image modal for larger preview
  - Delete functionality for removing images

## 🛠️ Tech Stack

### Frontend
- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [MUI 7](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Intersection Observer](https://www.npmjs.com/package/react-intersection-observer)

### Backend
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [UploadThing](https://uploadthing.com/) for image handling

## 📁 Folder Structure
```bash
gallery-verse/
├── app/                      # Next.js app directory
│   ├── api/uploadthing/     # UploadThing API handlers
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
│
├── components/              # UI Components
│   ├── AddImageForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ImageContext.tsx
│   ├── ImageGrid.tsx
│   ├── SearchBar.tsx
│   └── ThemeToggleButton.tsx
│
├── lib/                     # Utilities & Backend logic
│   ├── actions/
│   │   ├── image.action.ts
│   │   └── tag.action.ts
│   ├── database/
│   │   ├── models/
│   │   │   ├── image.model.ts
│   │   │   └── tag.model.ts
│   │   └── dbConnect.ts
│   ├── uploadthing.ts
│   ├── utils.ts
│   └── validation.ts
│
├── theme/                   # MUI theme customization
│   ├── theme.ts
│   └── ThemeRegistry.tsx
│
└── package.json
```

🧑‍💻 Getting Started
1. Clone the repository
 
```bash
git clone https://github.com/your-username/gallery-verse.git
cd gallery-verse
```
2. Install dependencies
```bash
npm install
```
3. Set up environment variables
Create a .env.local file and configure the following:

```bash
MONGODB_URI=your_mongodb_connection_string
UPLOADTHING_TOKEN==your_uploadthing_token
```

4. Run the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
npm start
```

✨ Credits
Built by [Md Rifaul Islam] with ❤️
Image uploading powered by UploadThing
