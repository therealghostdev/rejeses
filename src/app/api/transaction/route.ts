import {
  getTransactionById,
  getTransactionByStatus,
  createTransaction,
  updateTransaction,
} from "@/app/services/repository/transactions/transactions";
import { StatusType, TransactionType } from "@/utils/types/types";

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
