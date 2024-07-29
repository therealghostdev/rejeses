import {
  getOrdeById,
  updateOrder,
  getOrderByStatus,
} from "../../services/repository/order/order";
import { StatusType } from "@/utils/types/types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    if (id && status)
      return Response.json(
        {
          message: "You can only search by 'id' or 'status'",
        },
        { status: 400 }
      );

    if (id) {
      const order = await getOrdeById(Number(id));

      if (!order)
        return Response.json({ message: "Order not found" }, { status: 404 });

      if (order instanceof Error)
        return Response.json({ messge: order.message }, { status: 400 });

      return Response.json({
        data: order,
        message: "Order retrieved successfully",
        status: 200,
      });
    } else if (status) {
      const statusEnum = status as StatusType;

      if (!Object.values(StatusType).includes(statusEnum)) {
        return Response.json({ message: "Invalid status" }, { status: 400 });
      }

      const order = await getOrderByStatus(statusEnum);

      if (!order)
        return Response.json({ message: "Order not found" }, { status: 404 });

      if (order instanceof Error)
        return Response.json({ messge: order.message }, { status: 400 });

      return Response.json({
        data: order,
        message: "Order retrieved successfully",
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error gettting order" }, { status: 500 });
  }
}
