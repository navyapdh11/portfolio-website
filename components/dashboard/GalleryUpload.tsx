"use client";

import { useState } from "react";

export default function GalleryUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    
    // Simulate File Upload
    const file = e.target.files[0];
    console.log("Uploading file:", file.name);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    alert("Photo uploaded successfully!");
  };

  return (
    <div className="flex justify-center mt-4">
      <input type="file" id="photo-upload" className="hidden" onChange={handleUpload} accept="image/*" />
      <label htmlFor="photo-upload" className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${isUploading ? 'bg-zinc-500' : 'bg-purple-600 hover:bg-purple-700'}`}>
        {isUploading ? "Uploading..." : "Upload Photos"}
      </label>
    </div>
  );
}
