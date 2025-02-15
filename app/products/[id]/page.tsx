"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0])
  const [customization, setCustomization] = useState<Record<string, string>>({})

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        quantity,
        variant: selectedVariant,
        customization,
      },
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

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
          <h1 className="font-serif text-4xl text-brand-brown mb-4">{product.name}</h1>
          <p className="text-xl text-brand-dark mb-6">€{(selectedVariant?.price || product.price).toFixed(2)}</p>
          <p className="text-brand-dark mb-8">{product.description}</p>

          {product.variants && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-dark mb-2">Select Option</label>
              <Select
                value={selectedVariant?.id}
                onValueChange={(value) => {
                  setSelectedVariant(product.variants?.find((v) => v.id === value))
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a variant" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.name} - €{variant.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {product.customizationFields?.map((field) => (
            <div key={field.id} className="mb-6">
              <label className="block text-sm font-medium text-brand-dark mb-2">{field.label}</label>
              {field.type === "select" ? (
                <Select
                  value={customization[field.id]}
                  onValueChange={(value) => {
                    setCustomization((prev) => ({ ...prev, [field.id]: value }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
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
                  onChange={(e) => setCustomization((prev) => ({ ...prev, [field.id]: e.target.value }))}
                  className="h-10"
                />
              ) : (
                <Input
                  type="text"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={customization[field.id] || ""}
                  onChange={(e) => setCustomization((prev) => ({ ...prev, [field.id]: e.target.value }))}
                />
              )}
            </div>
          ))}

          <div className="mb-6">
            <label className="block text-sm font-medium text-brand-dark mb-2">Quantity</label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              className="w-24"
            />
          </div>

          <Button onClick={handleAddToCart} className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

