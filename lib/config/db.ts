import mongoose from "mongoose";

export const ConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('');
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
    throw error;
  }
};