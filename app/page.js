// app/page.js
import Link from "next/link";
import SSRImagesPage from "./ssr-images/page";
import CSRImagesPage from "./csr-images/page";

export default function Home() {
  return (
    <div>
      <h1>Image Viewer App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/ssr-images">SSR Images Page</Link>
          </li>
          <li>
            <Link href="/csr-images">CSR Images Page</Link>
          </li>
        </ul>
      </nav>
      <SSRImagesPage />
      <CSRImagesPage />
    </div>
  );
}
