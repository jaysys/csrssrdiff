// app/csr-images/page.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CSRImagesPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch("/api/images");
      const data = await response.json();
      setImages(data);
    }
    fetchImages();
  }, []);

  return (
    <div>
      <h1>CSR Images Page</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((img) => (
          <div key={img.id} style={{ margin: "10px" }}>
            <Image
              src={`data:image/jpeg;base64,${img.data}`}
              alt={`Image ${img.id}`}
              width={200}
              height={200}
            />
            <p>Image ID: {img.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
