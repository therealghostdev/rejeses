import crypto from "crypto";
import { StatusType } from "@/utils/types/types";
import { updateTransaction } from "@/app/services/repository/transactions/transactions";
import { updateOrder } from "@/app/services/repository/order/order";

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
    const { id, reference, fees } = body.data;

    const payment_id = id.toString();

    if (eventType === "charge.success" || eventType === "transfer.success") {
      const transaction = await updateTransaction(reference, {
        status: StatusType.completed,
        pid: payment_id,
        fee: fees,
      });

      await updateOrder(Number(transaction.orderRef), {
        status: StatusType.completed,
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
