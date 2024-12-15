import mongoose, { Document, Model } from "mongoose";

interface Blog extends Document {
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImg: string;
  date: Date;
}

const BlogSchema = new mongoose.Schema<Blog>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel: Model<Blog> = mongoose.models.blog || mongoose.model<Blog>("blog", BlogSchema);

export default BlogModel;
