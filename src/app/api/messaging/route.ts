import nodemailer from "nodemailer";
import { createEmailTemplate } from "@/utils/reusables/functions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { message: "Invalid or missing values" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      text: message,
      html: createEmailTemplate(name, email, message),
    });

    return Response.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error sending message" }, { status: 500 });
  }
}
