import nodemailer from "nodemailer";
import {
  createCourseEmailTemplate,
  formatPrice,
  formatCourseSchedule2,
  formatSingleDate,
} from "@/utils/reusables/functions";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return Response.json(
        { message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      courseType,
      startDate,
      courseSchedule,
      courseScheduleType,
      email,
      amount,
      currency,
    } = body;

    if (
      !firstName ||
      firstName == "" ||
      !lastName ||
      lastName === "" ||
      !courseType ||
      courseType === "" ||
      !startDate ||
      startDate === "" ||
      !courseScheduleType ||
      courseScheduleType === "" ||
      !courseSchedule ||
      courseSchedule.length === 0 ||
      !email ||
      email === "" ||
      !amount ||
      amount <= 0 ||
      isNaN(amount) ||
      !currency ||
      currency === ""
    ) {
      return Response.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
      logger: true,
    });

    const mailOptions = {
      from: `"Rejeses Consult" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Course Registration Confirmation",
      html: createCourseEmailTemplate(
        firstName,
        lastName,
        courseType,
        startDate,
        courseSchedule,
        courseScheduleType,
        amount,
        currency
      ),
    };

    await transporter.sendMail(mailOptions);

    const appOwnerEmailConfirmationContent = `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 30px;">
          <div style="background-color: #BA6820; color: white; text-align: center; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px;">
            <h1 style="margin: 0;">Course Registration Confirmation</h1>
          </div>
          <div style="margin-top: 18px;">
            <p style="margin-bottom: 15px; font-size: 15px;">
              A customer has successfully paid for a course. Below are the details:
            </p>

            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Name:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${firstName} ${lastName}</div>

            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Course Type:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${courseType}</div>

            ${
              !courseType.includes("Mentoring")
                ? `<div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Start Date:</div>
                 <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${
                   courseScheduleType === "weekend"
                     ? formatSingleDate(courseSchedule[0])
                     : formatSingleDate(startDate)
                 }</div>`
                : ""
            }

            ${
              !courseType.includes("Mentoring")
                ? `<div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Course Schedule Type:</div>
                 <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${courseScheduleType}</div>`
                : ""
            }

            ${
              !courseType.includes("Mentoring")
                ? `<div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Course Days:</div>
                 <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${formatCourseSchedule2(
                   courseSchedule
                 )}</div>`
                : ""
            }

            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Amount Paid:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${
              currency === "naira" ? "NGN" : "$"
            } ${formatPrice(amount)}</div>

            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Customer Email:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${email}</div>
          </div>
        </div>
      </body>
    </html>
  `;

    await transporter.sendMail({
      from: `Rejeses Consult ${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: "Course Registration Confirmation",
      html: appOwnerEmailConfirmationContent,
    });

    return Response.json(
      { message: "messages sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("error sending mail notification:", err);
    return Response.json(
      { message: "Error sending messages" },
      { status: 500 }
    );
  }
}
