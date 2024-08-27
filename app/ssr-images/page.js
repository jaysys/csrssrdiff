// app/ssr-images/page.js
import Image from "next/image";
import { getImages } from "../../lib/db";

export default async function SSRImagesPage() {
  const images = await getImages();

  return (
    <div>
      <h1>SSR Images Page</h1>
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
