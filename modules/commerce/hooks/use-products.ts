import { useState, useEffect } from "react";
import type { Product } from "@/modules/commerce/types/product";
import { products } from "@/data/products";

// This is a mock function that simulates fetching products from an API
const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    resolve(products);
  });
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
