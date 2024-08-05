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
  query: number | string,
  data: Partial<Omit<Transaction, "id" | "createdAt" | "updatedAt">>
): Promise<Transaction> => {
  try {
    if (typeof query === "number") {
      const found = await prisma.transaction.findFirst({
        where: { id: query },
      });
      if (!found) throw new Error("Transaction not found");
      return await prisma.transaction.update({ where: { id: query }, data });
    } else {
      const found = await prisma.transaction.findFirst({
        where: { reference: query },
      });

      if (!found) throw new Error("Transaction was not found");
      return await prisma.transaction.update({
        where: { id: found.id },
        data,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTransactionByReference = async (query: string) => {
  try {
    return await prisma.transaction.findFirst({ where: { reference: query } });
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
  getTransactionByReference,
};
