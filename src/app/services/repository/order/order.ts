import { prisma } from "../../../lib/prisma";
import { StatusType, OrderType } from "@/utils/types/types";
import { Order } from "@prisma/client";

const getOrdeById = async (query: number) => {
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
    const found = await getOrdeById(query);
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

export { getOrdeById, getOrderByStatus, createOrder, updateOrder };
