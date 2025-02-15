import type { Product } from "@/types/product"

export const products: Product[] = [
  {
    id: "custom-flower-box",
    name: "Custom Flower Box",
    description: "A beautiful arrangement of fresh flowers in a luxury box",
    price: 49.99,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "flowers",
    variants: [
      { id: "small", name: "Small", price: 49.99 },
      { id: "medium", name: "Medium", price: 69.99 },
      { id: "large", name: "Large", price: 89.99 },
    ],
    customizationFields: [
      {
        id: "color-scheme",
        label: "Color Scheme",
        type: "select",
        options: ["Pink & White", "Purple & White", "Red & White", "Mixed Colors"],
        required: true,
      },
      {
        id: "message",
        label: "Card Message",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "spa-gift-basket",
    name: "Spa Gift Basket",
    description: "Luxury spa products arranged in an elegant basket",
    price: 79.99,
    images: ["/placeholder.svg?height=600&width=600"],
    category: "wellness",
    variants: [
      { id: "essential", name: "Essential", price: 79.99 },
      { id: "premium", name: "Premium", price: 99.99 },
    ],
    customizationFields: [
      {
        id: "scent",
        label: "Scent",
        type: "select",
        options: ["Lavender", "Rose", "Vanilla", "Ocean"],
        required: true,
      },
    ],
  },
  // Add more products...
]

