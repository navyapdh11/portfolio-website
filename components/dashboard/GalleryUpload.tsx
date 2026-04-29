"use client";

import { useState } from "react";

export default function GalleryUpload() {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = () => {
    // Placeholder for gallery upload functionality
    alert("Gallery upload feature - connect your storage backend");
  };

  return (
    <div className="mt-4 p-4 bg-slate-700 rounded-xl">
      <h4 className="text-sm font-medium text-slate-300 mb-3">Upload Gallery Images</h4>
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
      >
        + Upload Images
      </button>
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {images.map((img, i) => (
            <div key={i} className="aspect-square bg-slate-600 rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
}
