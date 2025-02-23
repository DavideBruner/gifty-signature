export type ProductCategory = {
  id: string;
  name: string;
  description: string;
};

// Define the structure for variant options
export type VariantOption = {
  id: string;
  name: string;
  price?: number;
};

// Define a variant field (like size, flower count, etc)
export type VariantField = {
  id: string;
  name: string;
  options: VariantOption[];
};

// Updated Product type
export type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  categoryId: string;
  variantFields?: VariantField[];
  customizationFields?: CustomizationField[];
};

export type CustomizationField = {
  id: string;
  label: string;
  type: "text" | "color" | "select";
  options?: string[];
  required: boolean;
  price?: number;
};

// Type for selected variants in cart/order
export type SelectedVariants = {
  [fieldId: string]: string; // variantFieldId: selectedOptionId
};

// Type for customization values in cart/order
export type CustomizationValues = {
  [fieldId: string]: string;
};

// Updated cart item type
export type CartItem = {
  productId: string;
  quantity: number;
  selectedVariants?: SelectedVariants;
  customization?: CustomizationValues;
};
