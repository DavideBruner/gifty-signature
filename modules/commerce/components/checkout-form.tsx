"use client";

import type React from "react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { products } from "@/data/products";

import useEmail from "@/hooks/use-email";

import { celebrate } from "@/lib/party";
import { useCommerce } from "@/modules/commerce/context/commerce";
import { calculateItemPrice } from "../utils/price";

const steps = [
  {
    id: "customer",
    title: "Customer Information",
  },
  {
    id: "shipping",
    title: "Shipping Details",
  },
  {
    id: "review",
    title: "Review Order",
  },
];

export function CheckoutForm() {
  const router = useRouter();
  const { sendEmail } = useEmail();
  const { cart, total, clearCart } = useCommerce();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Customer Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Shipping Details
    address: "",
    city: "",
    postalCode: "",
    country: "",
    shippingMethod: "standard",

    // Additional Information
    giftMessage: "",
    specialInstructions: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendEmail({
        items: cart.items,
        total: total,
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.specialInstructions,
        },
        shipping: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          method: formData.shippingMethod,
        },
        type: "order_email",
      });

      if (result.success) {
        clearCart();
        toast.success("Order submitted successfully!");
        celebrate();
        router.push("/checkout/success");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-brand-brown text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="w-12 h-px bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="customer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-serif text-brand-brown">
                Customer Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-serif text-brand-brown">
                Shipping Details
              </h2>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="space-y-2">
                <Label>Shipping Method</Label>
                <RadioGroup
                  defaultValue="standard"
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, shippingMethod: value }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Shipping</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express Shipping</Label>
                  </div>
                </RadioGroup>
              </div> */}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-serif text-brand-brown">
                Review Your Order
              </h2>

              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Order Summary</h3>
                {cart.items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="flex justify-between">
                      <div>
                        <p>{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                          {item.selectedVariants && (
                            <span className="ml-2">
                              {Object.entries(item.selectedVariants).map(
                                ([fieldId, optionId]) => {
                                  const field = product.variantFields?.find(
                                    (f) => f.id === fieldId
                                  );
                                  const option = field?.options.find(
                                    (o) => o.id === optionId
                                  );
                                  if (!field || !option) return null;
                                  return (
                                    <span key={fieldId} className="ml-2">
                                      {field.name}: {option.name}
                                    </span>
                                  );
                                }
                              )}
                            </span>
                          )}
                        </p>
                        {item.customization && (
                          <p className="text-sm text-muted-foreground">
                            {Object.entries(item.customization).map(
                              ([fieldId, value]) => {
                                const field = product.customizationFields?.find(
                                  (f) => f.id === fieldId
                                );
                                if (!field) return null;
                                return (
                                  <span key={fieldId} className="ml-2">
                                    {field.label}: {value}
                                  </span>
                                );
                              }
                            )}
                          </p>
                        )}
                      </div>
                      <p>€{calculateItemPrice(item, product).toFixed(2)}</p>
                    </div>
                  );
                })}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="giftMessage">Gift Message (Optional)</Label>
                  <Textarea
                    id="giftMessage"
                    name="giftMessage"
                    value={formData.giftMessage}
                    onChange={handleInputChange}
                    placeholder="Add a personal message to your gift"
                  />
                </div>
                <div>
                  <Label htmlFor="specialInstructions">
                    Special Instructions (Optional)
                  </Label>
                  <Textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for your order"
                  />
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  By submitting this order, you agree to receive a quotation
                  including shipping costs. We will contact you with the final
                  price including shipping before processing your order.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-4 border-t">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="ml-auto bg-brand-brown hover:bg-brand-brown/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Order"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
