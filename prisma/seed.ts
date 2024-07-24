import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const upsertOrder = await prisma.order.upsert({
    where: {
      email: "test@mail.io",
    },
    update: {},
    create: {
      firstName: "Tariq",
      lastName: "St. Patrick",
      courseType: "Project Management for Training",
      startDate: "2024-04-13",
      email: "test@mail.io",
      amount: 10000,
      status: "successful",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    include: { transaction: true },
  });

  const upsertTransaction = await prisma.transaction.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      txid: "3",
      orderRef: upsertOrder.id,
      pid: "sample_pid",
      reference: "sample_reference",
      status: "paid",
      accessCode: "sample_accessCode",
      currency: "Naira",
      fee: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log(upsertTransaction);

  const updatedOrder = await prisma.order.update({
    where: {
      email: "test@mail.io",
    },
    data: {
      transaction: { connect: { id: upsertTransaction.id } },
    },
    include: { transaction: true },
  });

  console.log(updatedOrder);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
