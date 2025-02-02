import crypto from "crypto";
import { StatusType } from "@/utils/types/types";
import { updateTransaction } from "@/app/services/repository/transactions/transactions";
import { updateOrder } from "@/app/services/repository/order/order";
import nodemailer from "nodemailer";
import { formatPrice, getEmailConfig } from "@/utils/reusables/functions";

const email1 =
  process.env.NODE_ENV === "development"
    ? process.env.EMAIL_USER || ""
    : process.env.EMAIL_SERVICES || "";
const password =
  process.env.NODE_ENV === "development"
    ? process.env.EMAIL_PASS || ""
    : process.env.EMAIL_PASS_SERVICES || "";

export async function POST(req: Request) {
  try {
    const paystack_secret = process.env.PAYSTACK_SECRET;

    if (!paystack_secret) {
      console.error("PAYSTACK_SECRET is not set");
      return Response.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const paystack_sig = req.headers.get("x-paystack-signature");
    if (!paystack_sig) {
      return Response.json(
        { message: "Missing Paystack signature" },
        { status: 400 }
      );
    }

    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const expected_sig = crypto
      .createHmac("sha512", paystack_secret)
      .update(rawBody)
      .digest("hex");

    if (paystack_sig !== expected_sig) {
      return Response.json({ message: "Invalid signature" }, { status: 400 });
    }

    const eventType = body.event;
    const {
      id,
      reference,
      fees,
      paid_at,
      amount,
      currency,
      metadata: { custom_fields },
      customer: { email },
    } = body.data;

    const retrievedFirstName = custom_fields.map(
      (item: any) => item.first_name
    );
    const retrievedLastName = custom_fields.map((item: any) => item.last_name);

    const firstName = retrievedFirstName[0] || "";
    const lastName = retrievedLastName[0] || "";

    const payment_id = id.toString();

    const appOwnerEmailConfirmationContent = `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 30px;">
          <div style="background-color: #89c13e; color: white; text-align: center; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px;">
            <h1 style="margin: 0;">Course Payment Notification</h1>
          </div>
          <div style="margin-top: 18px;">
            <p style="margin-bottom: 15px; font-size: 15px;">
              A customer has accessed the payment portal and their payment was successful Below are the details:
            </p>
    
            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Transaction ID:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${id}</div>
    
            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Reference:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${reference}</div>
    
            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Name:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${firstName} ${lastName}</div>
    
            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Email:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${email}</div>
    
            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Amount Paid:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${
              currency === "NGN" ? "NGN" : "$"
            } ${formatPrice(amount / 100)}</div>
    
            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Payment Date:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${new Date(
              paid_at
            ).toLocaleString("en-GB")}</div>
    
            <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Payment Fees:</div>
            <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${currency} ${formatPrice(
      fees / 100
    )}</div>
          </div>
        </div>
        <!-- Footer -->
        <div style="text-align: center; font-size: 14px; color: #666; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0;">© 2024 Rejeses Consult. All rights reserved.</p>
          <p style="margin: 5px 0;">
            <a href="https://rejeses.com/" style="color: #89c13e; text-decoration: none;">Visit website</a>
          </p>
        </div>
      </body>
    </html>
    `;

    if (eventType === "charge.success" || eventType === "transfer.success") {
      const transaction = await updateTransaction(reference, {
        status: StatusType.completed,
        pid: payment_id,
        fee: fees,
      });

      await updateOrder(Number(transaction.orderRef), {
        status: StatusType.completed,
      });

      const createTransporter = () => {
        const config = getEmailConfig(email1, password);
        return nodemailer.createTransport(config);
      };

      const transporter = createTransporter();

      await transporter.sendMail({
        from: `Rejeses Consult ${email1}`,
        to: email1,
        subject: `Course Payment Notification`,
        html: appOwnerEmailConfirmationContent,
      });

      return Response.json(
        { message: "Transaction completed" },
        { status: 200 }
      );
    } else if (
      eventType === "charge.failed" ||
      eventType === "transfer.failed" ||
      eventType === "transfer.reversed"
    ) {
      const transaction = await updateTransaction(reference, {
        status: StatusType.failed,
        pid: payment_id,
        fee: fees,
      });

      await updateOrder(Number(transaction.orderRef), {
        status: StatusType.failed,
      });
      return Response.json({ message: "Transaction failed" }, { status: 200 });
    } else {
      return Response.json({ message: "Event received" }, { status: 200 });
    }
  } catch (err) {
    console.error("Error processing webhook", err);
    return Response.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}
