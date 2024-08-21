import {
  getTransactionById,
  getTransactionByStatus,
  createTransaction,
  updateTransaction,
} from "@/app/services/repository/transactions/transactions";
import { StatusType, TransactionType, CurrencyType } from "@/utils/types/types";
import {
  getOrderById,
  getOrderTransactions,
  updateOrder,
} from "@/app/services/repository/order/order";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

    const { ref, pid, currency, _fee } = body;

    const orderRef = Number(ref);
    const fee = Number(_fee);
    const requiredFields = {
      txid: `TXID--${uuidv4()}`,
      orderRef,
      pid,
      reference: "incoming",
      status: "pending" as StatusType,
      accessCode: "incoming",
      currency: currency === "NGN" ? CurrencyType.naira : CurrencyType.dollar,
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

    if (
      !Object.values(StatusType).includes(requiredFields.status as StatusType)
    )
      return Response.json(
        { message: "Invalid status value" },
        { status: 400 }
      );

    if (
      !Object.values(CurrencyType).includes(
        requiredFields.currency as CurrencyType
      )
    )
      return Response.json({ message: "Invalid currency" }, { status: 400 });

    const order = await getOrderById(orderRef);

    if (!order)
      return Response.json(
        { message: "Order for this transaction not found" },
        { status: 404 }
      );

    const transaction = await getOrderTransactions(orderRef);

    if (transaction.length > 0)
      return Response.json(
        {
          message: "Transaction for this order already exists",
        },
        { status: 409 }
      );

    const paystack_req_config = {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
    };

    const paystack_trans_data = {
      email: order.email,
      amount: order.amount * 100,
      currency:
        currency === "NGN" || currency === "naira"
          ? "NGN"
          : currency === "USD" || currency === "dollar"
          ? "USD"
          : "",
    };

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      paystack_trans_data,
      paystack_req_config
    );

    if (response.status) {
      requiredFields.reference = response.data?.data?.reference;
      requiredFields.accessCode = response.data?.data?.access_code;
      await createTransaction(requiredFields);
      return Response.json({
        data: response.data,
        message: "Success",
        status: 200,
      });
    } else {
      return Response.json(
        { message: "Failed to obtain reference from Paystack" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log(err);
    return Response.json(
      { message: "Error creating transaction" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return Response.json(
        { message: "Transaction id is required" },
        { status: 400 }
      );

    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.log(err);
      return Response.json(
        { mesage: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { txid, pid, reference, status, accessCode, currency, _fee } = body;

    const fee = _fee && Number(_fee);

    const validFields: Partial<TransactionType> = {};

    if (txid !== undefined) validFields.txid = txid;
    if (pid !== undefined) validFields.pid = pid;
    if (reference !== undefined) validFields.reference = reference;
    if (status !== undefined) validFields.status = status as StatusType;
    if (accessCode !== undefined) validFields.accessCode = accessCode;
    if (currency !== undefined) validFields.currency = currency;
    if (fee !== undefined) validFields.fee = fee;

    const containsEmptyString = Object.values(validFields).some(
      (fields) => fields === ""
    );

    if (Object.keys(validFields).length === 0)
      return Response.json(
        { message: "No valid field were provided" },
        { status: 400 }
      );

    if (containsEmptyString)
      return Response.json({ message: "Invalid field value" }, { status: 400 });

    if (_fee && isNaN(fee))
      return Response.json(
        {
          message: "Invalid field! '_fee' field must be a number",
        },
        { status: 400 }
      );

    if (status && !Object.values(StatusType).includes(status as StatusType))
      return Response.json(
        { message: "Invalid status value" },
        { status: 400 }
      );

    if (
      currency &&
      !Object.values(CurrencyType).includes(currency as CurrencyType)
    )
      return Response.json({ message: "Invalid currency" }, { status: 400 });

    const transaction = await getTransactionById(Number(id));

    if (!transaction)
      return Response.json(
        { message: "Transaction not found" },
        { status: 404 }
      );

    await updateTransaction(Number(id), validFields);

    status && (await updateOrder(Number(transaction.orderRef), { status }));
    return Response.json({ message: "Successful" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(
      { message: "Error updating transaction" },
      { status: 500 }
    );
  }
}
