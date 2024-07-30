import { prisma } from "../../../lib/prisma";
import { Transaction } from "@prisma/client";
import { StatusType, TransactionType } from "@/utils/types/types";

const getTransactionById = async (query: number) => {
  try {
    return await prisma.transaction.findFirst({ where: { id: query } });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTransactionByStatus = async (query: StatusType) => {
  try {
    return await prisma.transaction.findMany({ where: { status: query } });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createTransaction = async (data: TransactionType) => {
  try {
    return await prisma.transaction.create({ data });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateTransaction = async (
  query: number,
  data: Partial<Omit<Transaction, "id" | "createdAt" | "updatedAt">>
): Promise<Transaction> => {
  try {
    const found = await prisma.transaction.findFirst({ where: { id: query } });
    if (!found) throw new Error("Transaction not found");
    return await prisma.transaction.update({ where: { id: query }, data });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getTransactionById,
  getTransactionByStatus,
  createTransaction,
  updateTransaction,
};
