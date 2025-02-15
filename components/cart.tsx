"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/data/products";
import { sendOrderEmail } from "@/app/actions/send-order";

export function Cart() {
  const { state, dispatch } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    try {
      const result = await sendOrderEmail({
        items: state.items,
        total: state.total,
        customerInfo,
      });

      if (result.success) {
        dispatch({ type: "CLEAR_CART" });
        setCustomerInfo({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Failed to submit order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingBag className="h-6 w-6" />
          {state.items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-brown text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {state.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-brand-pink">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {state.items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;

            return (
              <div key={item.productId} className="flex items-center gap-4">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                    {item.variant && ` - ${item.variant.name}`}
                  </p>
                  {item.customization && (
                    <p className="text-sm text-gray-500">
                      Customization: {JSON.stringify(item.customization)}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_ITEM",
                      payload: { productId: item.productId },
                    })
                  }
                >
                  Remove
                </Button>
              </div>
            );
          })}

          {state.items.length > 0 ? (
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Your Name"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <Input
                type="tel"
                placeholder="Your Phone"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
              <Textarea
                placeholder="Additional Notes"
                value={customerInfo.message}
                onChange={(e) =>
                  setCustomerInfo((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
              />
              <Button
                className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Order Request"}
              </Button>
            </div>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
