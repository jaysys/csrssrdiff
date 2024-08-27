// app/api/images/route.js
import { getImages } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await getImages();
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
