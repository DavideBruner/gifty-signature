"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { products } from "@/data/products";
import { CartItem, Product } from "../types/product";
import { useCart } from "../context/cart-context";
import { toast } from "sonner";

function calculateItemPrice(item: CartItem, product: Product): number {
  let price = product.basePrice;

  // Add variant prices
  if (product.variantFields && item.selectedVariants) {
    for (const field of product.variantFields) {
      const selectedOptionId = item.selectedVariants[field.id];
      if (selectedOptionId) {
        const option = field.options.find((opt) => opt.id === selectedOptionId);
        if (option?.price) {
          price += option.price;
        }
      }
    }
  }

  // Add customization prices
  if (product.customizationFields && item.customization) {
    for (const field of product.customizationFields) {
      if (field.price && item.customization[field.id]) {
        price += field.price;
      }
    }
  }

  return price * item.quantity;
}

export function Cart() {
  const { state, dispatch } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const cartTotal = state.items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return total;
    return total + calculateItemPrice(item, product);
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6">
          {state.items.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {state.items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                const itemPrice = calculateItemPrice(item, product);

                return (
                  <div key={item.productId} className="flex gap-4">
                    <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-lg">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                          {item.selectedVariants &&
                            Object.entries(item.selectedVariants).map(
                              ([fieldId, optionId]) => {
                                const field = product.variantFields?.find(
                                  (f) => f.id === fieldId
                                );
                                const option = field?.options.find(
                                  (o) => o.id === optionId
                                );
                                if (!field || !option) return null;
                                return (
                                  <p
                                    key={fieldId}
                                    className="text-sm text-muted-foreground"
                                  >
                                    {field.name}: {option.name}
                                    {option.price
                                      ? ` (+€${option.price.toFixed(2)})`
                                      : ""}
                                  </p>
                                );
                              }
                            )}
                          {item.customization &&
                            Object.entries(item.customization).map(
                              ([fieldId, value]) => {
                                const field = product.customizationFields?.find(
                                  (f) => f.id === fieldId
                                );
                                if (!field) return null;
                                return (
                                  <p
                                    key={fieldId}
                                    className="text-sm text-muted-foreground"
                                  >
                                    {field.label}: {value}
                                    {field.price
                                      ? ` (+€${field.price.toFixed(2)})`
                                      : ""}
                                  </p>
                                );
                              }
                            )}
                        </div>
                        <p className="font-medium">€{itemPrice.toFixed(2)}</p>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_ITEM",
                              payload: { productId: item.productId },
                            });
                            toast.message(`${product.name} removed from cart`);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">€{cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping costs will be calculated during the quotation process.
              </p>
              <Button
                className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white"
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
