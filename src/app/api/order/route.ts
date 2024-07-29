import { json } from "stream/consumers";
import {
  getOrdeById,
  updateOrder,
  getOrderByStatus,
  createOrder,
} from "../../services/repository/order/order";
import { StatusType } from "@/utils/types/types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    if (!id && !status)
      return Response.json(
        { message: "No search params provided" },
        { status: 400 }
      );

    if (id && status)
      return Response.json(
        { message: "You can only search by 'id' or 'status'" },
        { status: 400 }
      );

    if (id) {
      const order = await getOrdeById(Number(id));

      if (!order)
        return Response.json({ message: "Order not found" }, { status: 404 });

      return Response.json({
        data: order,
        message: "Order retrieved successfully",
        status: 200,
      });
    } else if (status) {
      const refinedStatus = status.toLowerCase() as StatusType;

      if (!Object.values(StatusType).includes(refinedStatus)) {
        return Response.json({ message: "Invalid status" }, { status: 400 });
      }

      const orders = await getOrderByStatus(refinedStatus);

      if (!orders || orders.length === 0)
        return Response.json(
          { message: "No orders found with this status" },
          { status: 404 }
        );

      return Response.json({
        data: orders,
        message: "Orders retrieved successfully",
        status: 200,
      });
    }
  } catch (err) {
    console.error("Error getting order:", err);
    return Response.json({ message: "Error getting order" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      courseType,
      startDate,
      email,
      amount,
      status,
    } = await req.json();

    const requiredFields = {
      firstName,
      lastName,
      courseType,
      startDate,
      email,
      amount,
      status,
    };

    if (
      Object.values(requiredFields).some(
        (field) => field == null || field === ""
      )
    ) {
      return Response.json(
        { message: "Missing or empty body parameters" },
        { status: 400 }
      );
    }

    if (!Object.values(StatusType).includes(status as StatusType))
      return Response.json(
        { message: "Invalid status value" },
        { status: 400 }
      );

    await createOrder({
      firstName,
      lastName,
      courseType,
      startDate,
      email,
      amount,
      status: status as StatusType,
    });
    return Response.json({ message: "Success", status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error creating order" }, { status: 500 });
  }
}
