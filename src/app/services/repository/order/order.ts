import { prisma } from "../../../lib/prisma";
import { StatusType, OrderType } from "@/utils/types/types";
import { Order } from "@prisma/client";

const getOrderById = async (query: number) => {
  try {
    return await prisma.order.findFirst({ where: { id: query } });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getOrderByStatus = async (query: StatusType) => {
  try {
    return await prisma.order.findMany({ where: { status: query } });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createOrder = async (data: OrderType) => {
  try {
    return await prisma.order.create({
      data,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateOrder = async (
  query: number,
  data: Partial<Omit<Order, "id" | "createdAt" | "updatedAt">>
): Promise<Order> => {
  try {
    const found = await getOrderById(query);
    if (!found) {
      throw new Error("Order not found");
    }
    return await prisma.order.update({
      where: { id: query },
      data,
    });
  } catch (err) {
    console.error("Error updating order:", err);
    throw err;
  }
};

const getOrderTransactions = async (query: number) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        orderRef: query,
      },
    });
    return transactions;
  } catch (err) {
    console.log("Error getting transactions");
    throw err;
  }
};

export {
  getOrderById,
  getOrderByStatus,
  createOrder,
  updateOrder,
  getOrderTransactions,
};
