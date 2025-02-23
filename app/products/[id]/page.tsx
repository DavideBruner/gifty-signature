"use client";

import { useState } from "react";
import Image from "next/image";

import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/modules/commerce/context/cart-context";
import {
  CustomizationValues,
  SelectedVariants,
} from "@/modules/commerce/types/product";
import { toast } from "sonner";
import { celebrate } from "@/lib/party";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { dispatch } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>(
    {}
  );
  const [customization, setCustomization] = useState<CustomizationValues>({});

  // Find the product
  const product = products.find((p) => p.id === params.id);

  // If product is not found, show error state
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-serif text-brand-brown">
          Product not found
        </h1>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    let total = product.basePrice;

    // Add variant prices
    if (product.variantFields) {
      for (const field of product.variantFields) {
        const selectedOptionId = selectedVariants[field.id];
        if (selectedOptionId) {
          const option = field.options.find(
            (opt) => opt.id === selectedOptionId
          );
          if (option?.price) {
            total += option.price;
          }
        }
      }
    }

    // Add customization prices
    if (product.customizationFields) {
      for (const field of product.customizationFields) {
        if (field.price && customization[field.id]) {
          total += field.price;
        }
      }
    }

    return total * quantity;
  };

  const handleAddToCart = () => {
    // Validate required variants
    if (product.variantFields) {
      for (const field of product.variantFields) {
        if (!selectedVariants[field.id]) {
          toast.error(`Please select ${field.name}`);
          return;
        }
      }
    }

    // Validate required customizations
    if (product.customizationFields) {
      for (const field of product.customizationFields) {
        if (field.required && !customization[field.id]) {
          toast.error(`Please fill in ${field.label}`);
          return;
        }
      }
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        quantity,
        selectedVariants,
        customization,
      },
    });
    toast.success(`${product.name} added to cart`);
    celebrate();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative overflow-hidden rounded-lg ${
                  selectedImage === index ? "ring-2 ring-brand-brown" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-serif text-4xl text-brand-brown mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-brand-dark mb-6">
            From €{product.basePrice.toFixed(2)}
          </p>
          <p className="text-brand-dark mb-8">{product.description}</p>

          {product.variantFields?.map((field) => (
            <div key={field.id} className="mb-6">
              <label className="block text-sm font-medium text-brand-dark mb-2">
                {field.name}
              </label>
              <Select
                value={selectedVariants[field.id]}
                onValueChange={(value) => {
                  setSelectedVariants((prev) => ({
                    ...prev,
                    [field.id]: value,
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Select ${field.name.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                      {option.price ? ` (+€${option.price.toFixed(2)})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {product.customizationFields?.map((field) => (
            <div key={field.id} className="mb-6">
              <label className="block text-sm font-medium text-brand-dark mb-2">
                {field.label}
                {field.price ? ` (+€${field.price.toFixed(2)})` : ""}
                {field.required && " *"}
              </label>
              {field.type === "select" ? (
                <Select
                  value={customization[field.id]}
                  onValueChange={(value) => {
                    setCustomization((prev) => ({
                      ...prev,
                      [field.id]: value,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={`Select ${field.label.toLowerCase()}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "color" ? (
                <Input
                  type="color"
                  value={customization[field.id] || "#000000"}
                  onChange={(e) =>
                    setCustomization((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  className="h-10"
                />
              ) : (
                <Input
                  type="text"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={customization[field.id] || ""}
                  onChange={(e) =>
                    setCustomization((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          ))}

          <div className="mb-6">
            <label className="block text-sm font-medium text-brand-dark mb-2">
              Quantity
            </label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))
              }
              className="w-24"
            />
          </div>

          <div className="mb-6">
            <p className="text-lg font-medium">
              Total: €{calculateTotalPrice().toFixed(2)}
            </p>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
