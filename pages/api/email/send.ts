import { NextApiRequest, NextApiResponse } from "next";
import { sendOrderEmail, sendInfoEmail } from "@/lib/emails";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.type == "order_email") {
      const { items, total, customerInfo, shipping } = req.body;
      const data = await sendOrderEmail({
        items,
        total,
        customerInfo,
        shipping,
      });
      if (data?.success) {
        return res.status(200).json(data);
      }

      if (data?.error) {
        return res.status(500).json(data);
      }
    }

    if (req.body.type == "info_email") {
      const { name, email, phone, message } = req.body;
      const data = await sendInfoEmail({ name, email, phone, message });
      if (data?.success) {
        return res.status(200).json(data);
      }

      if (data?.error) {
        return res.status(500).json(data);
      }
    }
  }
}
