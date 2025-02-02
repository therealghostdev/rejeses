import { generatePromoCode } from "@/app/services/repository/promocode/promocode";
import fs from "fs/promises";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "public/promo/promo.json");

export async function GET() {
  try {
    const configData = await fs.readFile(CONFIG_PATH, "utf-8");
    const config = JSON.parse(configData);

    if (config.isPromo) {
      await generatePromoCode();
      return Response.json({ success: true, message: "Promo code generated" });
    }
    return Response.json({ success: false, message: "Promo is disabled" });
  } catch (err) {
    console.log("Error generating promo code:", err);
  }
}
