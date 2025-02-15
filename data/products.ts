import type { Product, ProductCategory } from "@/types/product";

export const categories: ProductCategory[] = [
  {
    id: "gift-boxes",
    name: "Gift Boxes",
    description: "Curated gift boxes for every occasion",
  },
  {
    id: "flowers",
    name: "Flowers",
    description: "Fresh floral arrangements",
  },
  {
    id: "candles",
    name: "Candles",
    description: "Scented candles to enhance your ambiance",
  },
  {
    id: "occasions",
    name: "Special Occasions",
    description: "Tailored gifts for celebrations",
  },
];

export const products: Product[] = [
  {
    id: "custom-flower-box",
    name: "Custom Flower Box",
    description: "A beautiful arrangement of fresh flowers in a luxury box",
    price: 49.99,
    images: ["/products/flowers.jpeg?height=600&width=600"],
    categoryId: "flowers",
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
        options: [
          "Pink & White",
          "Purple & White",
          "Red & White",
          "Mixed Colors",
        ],
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
    categoryId: "gift-boxes",
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
  {
    id: "birthday-surprise",
    name: "Birthday Surprise Box",
    description: "A special curated box for birthday celebrations",
    price: 89.99,
    images: ["/placeholder.svg?height=600&width=600"],
    categoryId: "occasions",
    variants: [
      { id: "classic", name: "Classic", price: 89.99 },
      { id: "deluxe", name: "Deluxe", price: 129.99 },
    ],
    customizationFields: [
      {
        id: "theme",
        label: "Theme",
        type: "select",
        options: ["Elegant", "Fun", "Romantic", "Classic"],
        required: true,
      },
    ],
  },
];
