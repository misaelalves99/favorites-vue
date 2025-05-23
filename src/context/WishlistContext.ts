// src/context/WishlistContext.ts

import { inject, provide, ref, watch } from "vue";
import type { Ref } from "vue";
import type { Product } from "../types/product";

type WishlistContextType = {
  wishlist: Ref<Product[]>;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
};

const WishlistSymbol = Symbol("WishlistContext");

export function provideWishlist() {
  const wishlist = ref<Product[]>([]);

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        wishlist.value = JSON.parse(stored);
      } catch {
        wishlist.value = [];
      }
    }
  }

  watch(
    wishlist,
    (newVal) => {
      localStorage.setItem("favorites", JSON.stringify(newVal));
    },
    { deep: true }
  );

  function addToWishlist(product: Product) {
    if (!wishlist.value.find((p) => p.id === product.id)) {
      wishlist.value.push(product);
    }
  }

  function removeFromWishlist(productId: number) {
    wishlist.value = wishlist.value.filter((p) => p.id !== productId);
  }

  const context: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  provide(WishlistSymbol, context);
}

export function useWishlist(): WishlistContextType {
  const context = inject<WishlistContextType>(WishlistSymbol);
  if (!context) {
    throw new Error("useWishlist deve ser usado dentro de provideWishlist");
  }
  return context;
}
