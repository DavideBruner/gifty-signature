import { NextApiRequest, NextApiResponse } from "next";
import { sendOrderEmail } from "@/app/actions/send-order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { items, total, customerInfo } = req.body;
    const data = await sendOrderEmail({ items, total, customerInfo });
    if (data?.success) {
      return res.status(200).json(data);
    }

    if (data?.error) {
      return res.status(500).json(data);
    }
  }
}
