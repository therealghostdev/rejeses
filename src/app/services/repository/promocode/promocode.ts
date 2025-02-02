import { prisma } from "../../../lib/prisma";
import { createPromoEmailTemplate } from "@/utils/reusables/functions";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const generateUniquePromoCode = async (): Promise<string> => {
  let code: string;
  let exists = true;

  while (exists) {
    const randomAlpha = Math.random().toString(36).substring(2, 8);
    const formattedAlpha = randomAlpha
      .split("")
      .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char))
      .join("");

    const getRandomNumber = () =>
      Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");

    code = `RJE-SPE-${getRandomNumber()}-${formattedAlpha}-${getRandomNumber()}-${getRandomNumber()}`;

    const existingCode = await prisma.promoCode.findUnique({
      where: { code },
    });

    if (!existingCode) {
      exists = false;
    }
  }

  return code!;
};

export const generatePromoCode = async () => {
  try {
    const code = await generateUniquePromoCode();

    console.log(code, "is generatedCode");

    const newPromoCode = await prisma.promoCode.create({
      data: {
        code,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await transporter.sendMail({
      from: `Rejeses Consult ${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: `NEW PROMOCODE GENERATED FROM APP SERVER`,
      html: createPromoEmailTemplate(newPromoCode.code, newPromoCode.expiresAt),
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const validatePromoCode = async (value: string) => {
  try {
    const retrievedCode = await prisma.promoCode.findUnique({
      where: {
        code: value,
      },
    });

    if (!retrievedCode) return false;

    const expiryDate = new Date(retrievedCode.expiresAt);
    const today = new Date();

    if (expiryDate > today) {
      return retrievedCode;
    }
    return false;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
