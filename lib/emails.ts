import nodemailer from "nodemailer";
import { CartItem } from "@/context/cart-context";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Boolean(process.env.SMTP_SECURE),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail(orderDetails: {
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
}) {
  try {
    const info = await transporter.sendMail({
      from: '"GiftySignature Orders" <request@giftysignature.com>',
      to: "info@giftysignature.com",
      subject: "New Order Request",
      html: `
        <h1>New Order Request</h1>
        <h2>Customer Information</h2>
        <p>Name: ${orderDetails.customerInfo.name}</p>
        <p>Email: ${orderDetails.customerInfo.email}</p>
        <p>Phone: ${orderDetails.customerInfo.phone}</p>
        <p>Message: ${orderDetails.customerInfo.message}</p>
        
        <h2>Order Items</h2>
        ${orderDetails.items
          .map(
            (item) => `
          <div>
            <p>Product ID: ${item.productId}</p>
            <p>Quantity: ${item.quantity}</p>
            ${item.variant ? `<p>Variant: ${item.variant.name}</p>` : ""}
            ${
              item.customization
                ? `<p>Customization: ${JSON.stringify(item.customization)}</p>`
                : ""
            }
          </div>
        `
          )
          .join("<hr/>")}
        
        <h2>Total Items: ${orderDetails.items.length}</h2>
        <h3>Price: ${orderDetails.total} €</h2>
      `,
    });

    if (info.messageId) {
      return { success: true };
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function sendInfoEmail(details: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: '"GiftySignature Contact" <contact@giftysignature.com>',
      to: "info@giftysignature.com",
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p>Name: ${details.name}</p>
        <p>Email: ${details.email}</p>
        <p>Phone: ${details.phone}</p>
        <p>Message: ${details.message}</p>
      `,
    });

    if (info.messageId) {
      return { success: true };
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: (error as Error).message };
  }
}
