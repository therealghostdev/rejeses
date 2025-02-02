import { generatePromoCode } from "@/app/services/repository/promocode/promocode";

export async function GET() {
  try {
    await generatePromoCode();
    return Response.json({ success: true, message: "Promo code generated" });
  } catch (err) {
    console.log("Error generating promo code:", err);
  }
}
