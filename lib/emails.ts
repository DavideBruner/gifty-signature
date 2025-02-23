import { products } from "@/data/products";
import { CartItem } from "@/modules/commerce/types/product";
import nodemailer from "nodemailer";

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
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}) {
  try {
    const info = await transporter.sendMail({
      from: '"GiftySignature Orders" <request@giftysignature.com>',
      to: "info@giftysignature.com",
      subject: "New Order Request",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Order Request</h1>
        
        <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
        <h2 style="color: #444; margin-top: 0;">Customer Information</h2>
        <p><strong>Name:</strong> ${orderDetails.customerInfo.name}</p>
        <p><strong>Email:</strong> ${orderDetails.customerInfo.email}</p>
        <p><strong>Phone:</strong> ${orderDetails.customerInfo.phone}</p>
        <p><strong>Message:</strong> ${orderDetails.customerInfo.message}</p>
        </div>

        <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
        <h2 style="color: #444; margin-top: 0;">Shipping Information</h2>
        <p><strong>Address:</strong> ${orderDetails.shipping.address}</p>
        <p><strong>City:</strong> ${orderDetails.shipping.city}</p>
        <p><strong>Postal Code:</strong> ${orderDetails.shipping.postalCode}</p>
        <p><strong>Country:</strong> ${orderDetails.shipping.country}</p>
        </div>

        <h2 style="color: #444;">Order Items</h2>
        ${orderDetails.items
          .map((item) => {
            const product = products.find((p) => p.id === item.productId);

            return `
        <div style="border: 1px solid #eee; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
          <p><strong>Product ID:</strong> ${item.productId}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          ${
            item.selectedVariants
              ? Object.entries(item.selectedVariants)
                  .map(([fieldId, optionId]) => {
                    const field = product?.variantFields?.find(
                      (f) => f.id === fieldId
                    );
                    const option = field?.options.find(
                      (o) => o.id === optionId
                    );
                    if (!field || !option) return "";
                    return `<p style="color: #666; font-size: 14pxxw;">
              ${field.name}: ${option.name}${
                      option.price ? ` (+€${option.price.toFixed(2)})` : ""
                    }
            </p>`;
                  })
                  .join("")
              : ""
          }
          ${
            item.customization
              ? Object.entries(item.customization)
                  .map(([fieldId, value]) => {
                    const field = product?.customizationFields?.find(
                      (f) => f.id === fieldId
                    );
                    if (!field) return "";
                    return `<p style="color: #666; font-size: 14px;">
              ${field.label}: ${value}${
                      field.price ? ` (+€${field.price.toFixed(2)})` : ""
                    }
            </p>`;
                  })
                  .join("")
              : ""
          }
        </div>
        `;
          })
          .join("")}

        <div style="background-color: #f9f9f9; padding: 15px; margin-top: 20px; border-radius: 5px;">
        <h2 style="color: #444; margin-top: 0;">Order Summary</h2>
        <p><strong>Total Items:</strong> ${orderDetails.items.length}</p>
        <p style="font-size: 18px;"><strong>Total Price:</strong> €${orderDetails.total.toFixed(
          2
        )}</p>
        </div>
      </div>
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
