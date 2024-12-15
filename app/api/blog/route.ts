import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";

const LoadDB = async (): Promise<void> => {
  await ConnectDB();
};

LoadDB();

interface Blog {
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImg: string;
}

// API Endpoint to get all blogs
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const blogId = url.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// API Endpoint For Uploading Blogs
export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image") as File;
  if (!image) {
    return NextResponse.json({ success: false, msg: "Image is required" });
  }

  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData: Blog = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: imgUrl,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}

// Creating API Endpoint to delete Blog
export async function DELETE(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, msg: "Blog ID is required" });
  }

  const blog = await BlogModel.findById(id);
  if (blog) {
    fs.unlink(`./public${blog.image}`, () => {});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted" });
  } else {
    return NextResponse.json({ success: false, msg: "Blog not found" });
  }
}
