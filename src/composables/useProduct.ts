// src/composables/useProduct.ts

import { inject, provide, ref } from "vue";
import type { Ref } from "vue";
import type { Product } from "../types/product";
import { getProducts } from "../services/productService";

type ProductContextType = {
  products: Ref<Product[]>;
  error: Ref<string | null>;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
};

const ProductSymbol = Symbol("ProductContext");

export function provideProduct() {
  const products = ref<Product[]>([]);
  const error = ref<string | null>(null);

  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts;
  };

  const fetchProducts = async () => {
    try {
      error.value = null;
      const data: Product[] = await getProducts();
      products.value = data;
    } catch (err) {
      error.value = (err as Error).message;
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const context: ProductContextType = {
    products,
    error,
    setProducts,
    fetchProducts,
  };

  provide(ProductSymbol, context);
}

export function useProduct(): ProductContextType {
  const context = inject<ProductContextType>(ProductSymbol);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de provideProduct");
  }
  return context;
}
