import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async (): Promise<void> => {
  await ConnectDB();
};
LoadDB();

interface EmailData {
  email: string;
}

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const emailData: EmailData = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, msg: "Email Subscribed" });
}

export async function GET(request: Request): Promise<Response> {
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function DELETE(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, msg: "Email ID is required" });
  }
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email Deleted" });
}
