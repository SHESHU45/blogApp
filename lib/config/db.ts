import mongoose from "mongoose";

export const ConnectDB = async (): Promise<void> => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI as string;
    await mongoose.connect(MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
    throw error;
  }
};
