import {
  getTransactionById,
  getTransactionByStatus,
  createTransaction,
  updateTransaction,
} from "@/app/services/repository/transactions/transactions";
import { StatusType, TransactionType } from "@/utils/types/types";
import { getOrdeById } from "@/app/services/repository/order/order";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    const status = searchParams.get("status");

    if (!id && !status)
      return Response.json(
        {
          message: "No search param provided",
        },
        { status: 400 }
      );

    if (id && status)
      return Response.json(
        {
          message: "You can only search by 'id' or 'status'",
        },
        { status: 400 }
      );

    if (id) {
      const transaction = await getTransactionById(Number(id));

      if (!transaction)
        return Response.json(
          { message: "Transaction not found" },
          { status: 404 }
        );

      return Response.json({
        data: transaction,
        message: "Transaction retrieved successfully",
        status: 200,
      });
    } else if (status) {
      const refinedStatus = status.toLowerCase() as StatusType;

      if (!Object.values(StatusType).includes(refinedStatus)) {
        return Response.json({ message: "Invalid status" }, { status: 400 });
      }

      const transactions = await getTransactionByStatus(status as StatusType);

      if (!transactions || transactions.length === 0)
        return Response.json(
          {
            message: "No transactions with this status found",
          },
          { status: 404 }
        );

      return Response.json({
        data: transactions,
        message: "Transactions retrieved successfully",
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    Response.json({ message: "Error getting transaction", status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.log(err);
      return Response.json(
        { message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { txid, ref, pid, reference, status, accessCode, currency, _fee } =
      body;

    const orderRef = Number(ref);
    const fee = Number(_fee);
    const requiredFields = {
      txid,
      orderRef,
      pid,
      reference,
      status,
      accessCode,
      currency,
      fee,
    };

    if (
      Object.values(requiredFields).some(
        (fields) => fields === null || fields === "" || fields === undefined
      )
    )
      return Response.json(
        { message: "Missing or empty body parameters" },
        { status: 400 }
      );

    if (isNaN(orderRef) || isNaN(fee))
      return Response.json(
        {
          message: "Invalid fields! 'ref' or '_fee' fields must be a number",
        },
        { status: 400 }
      );

    if (!Object.values(StatusType).includes(status as StatusType))
      return Response.json(
        { message: "Invalid status value" },
        { status: 400 }
      );

    const order = await getOrdeById(orderRef);

    if (!order)
      return Response.json(
        { message: "Order for this transaction not found" },
        { status: 404 }
      );

    // return Response.json({ data: order, message: "sucessful", status: 200 });

    await createTransaction(requiredFields);
    return Response.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    Response.json({ message: "Error creating transaction" }, { status: 500 });
  }
}
