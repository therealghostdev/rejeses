import { json } from "stream/consumers";
import {
  getOrdeById,
  updateOrder,
  getOrderByStatus,
  createOrder,
} from "../../services/repository/order/order";
import { StatusType, OrderType } from "@/utils/types/types";

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
    let requestBody;
    try {
      requestBody = await req.json();
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
      email,
      amount,
      status,
    } = requestBody;

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

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id)
      return Response.json(
        { message: "Order id is required!" },
        { status: 400 }
      );

    let requestBody;
    try {
      requestBody = await req.json();
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
      email,
      amount,
      status,
    } = requestBody;

    const validFields: Partial<OrderType> = {};
    const refinedStatus = status?.toLowerCase() as StatusType;

    if (firstName !== undefined) validFields.firstName = firstName;
    if (lastName !== undefined) validFields.lastName = lastName;
    if (courseType !== undefined) validFields.courseType = courseType;
    if (startDate !== undefined) validFields.startDate = startDate;
    if (email !== undefined) validFields.email = email;
    if (amount !== undefined) validFields.amount = amount;
    if (status !== undefined) validFields.status = refinedStatus;

    const containsEmptyString = Object.values(validFields).some(
      (item) => item === ""
    );

    if (Object.keys(validFields).length === 0)
      return Response.json(
        { message: "No valid fields were provided" },
        { status: 400 }
      );

    if (containsEmptyString)
      return Response.json({ message: "invalid field value" }, { status: 400 });

    if (status && !Object.values(StatusType).includes(status as StatusType))
      return Response.json(
        { message: "Invalid status value" },
        { status: 400 }
      );

    await updateOrder(Number(id), validFields);
    return Response.json({
      message: "Order update successful",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error updating order" }, { status: 500 });
  }
}
