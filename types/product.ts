export type CustomizationField = {
  id: string
  label: string
  type: "text" | "color" | "select"
  options?: string[]
  required: boolean
}

export type ProductVariant = {
  id: string
  name: string
  price: number
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  customizationFields?: CustomizationField[]
  variants?: ProductVariant[]
}

