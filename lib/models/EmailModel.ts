import mongoose, { Document, Model } from "mongoose";

interface Email extends Document {
  email: string;
  date: Date;
}

const EmailSchema = new mongoose.Schema<Email>({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const EmailModel: Model<Email> = mongoose.models.email || mongoose.model<Email>("email", EmailSchema);

export default EmailModel;
