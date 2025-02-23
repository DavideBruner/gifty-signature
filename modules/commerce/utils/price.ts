import { CartItem, Product } from "../types/product";

export function calculateItemPrice(item: CartItem, product: Product): number {
  let total = product.basePrice;

  // Add variant prices
  if (product.variantFields && item.selectedVariants) {
    for (const field of product.variantFields) {
      const selectedOptionId = item.selectedVariants[field.id];
      if (selectedOptionId) {
        const option = field.options.find((opt) => opt.id === selectedOptionId);
        if (option?.price) {
          total += option.price;
        }
      }
    }
  }

  // Add customization prices
  if (product.customizationFields && item.customization) {
    for (const field of product.customizationFields) {
      if (field.price && item.customization[field.id]) {
        total += field.price;
      }
    }
  }

  return total * item.quantity;
}
