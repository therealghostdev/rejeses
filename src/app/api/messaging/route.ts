import nodemailer from "nodemailer";
import {
  createEmailTemplate,
  getEmailConfig,
} from "@/utils/reusables/functions";

const email1 =
  process.env.NODE_ENV === "development"
    ? process.env.EMAIL_USER || ""
    : process.env.EMAIL_INFO || "";
const password =
  process.env.NODE_ENV === "development"
    ? process.env.EMAIL_PASS || ""
    : process.env.EMAIL_PASS_INFO || "";

const createTransporter = () => {
  const config = getEmailConfig(email1, password);
  return nodemailer.createTransport(config);
};

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

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: email1,
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
