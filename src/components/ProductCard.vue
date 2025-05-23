<!-- src/components/ProductCard.vue -->

<template>
  <div class="card">
    <div class="imageWrapper">
      <img
        :src="product.imageUrl || '/images/product-placeholder.png'"
        :alt="product.name"
        width="300"
        height="300"
        class="productImage"
      />
      <button
        @click="toggleFavorite"
        class="favoriteIcon"
        aria-label="Toggle Favorite"
      >
        <Heart
          :size="22" 
          :color="isFavorite ? 'red' : 'gray'"
          stroke-width="1.5"
          :fill="isFavorite ? 'red' : 'none'"
        />
      </button>
    </div>

    <div class="details">
      <h3 class="productName">{{ product.name }}</h3>
      <p class="productDescription">{{ product.description }}</p>
      <p class="productPrice">R$ {{ product.price.toFixed(2) }}</p>

      <div class="buttonGroup">
        <button class="cartButton" aria-label="Adicionar ao carrinho">
          <ShoppingCart :size="20" color="white" />
        </button>

        <button class="buyButton" @click="buyNow">
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import type { Product } from "../types/product";
import { Heart, ShoppingCart } from "lucide-vue-next";
import { useWishlist } from "../context/WishlistContext";

const props = defineProps<{
  product: Product;
  onBuyNow?: (product: Product) => void;
}>();

const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

const isFavorite = ref(false);

const checkFavorite = () => {
  isFavorite.value = wishlist.value.some((item) => item.id === props.product.id);
};

const toggleFavorite = () => {
  if (isFavorite.value) {
    removeFromWishlist(Number(props.product.id));
  } else {
    addToWishlist(props.product);
  }
  isFavorite.value = !isFavorite.value;
};

const buyNow = () => {
  if (props.onBuyNow) props.onBuyNow(props.product);
};

onMounted(() => {
  checkFavorite();
});

watch(
  () => wishlist.value,
  () => {
    checkFavorite();
  },
  { deep: true }
);

watch(
  () => props.product.id,
  () => {
    checkFavorite();
  }
);
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.imageWrapper {
  width: 100%;
  height: 250px;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

.productImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.productImage:hover {
  transform: scale(1.05);
}

.details {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 230px;
}

.productName {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-transform: capitalize;
}

.productDescription {
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 16px;
  line-height: 1.4;
}

.productPrice {
  font-size: 1.1rem;
  font-weight: 500;
  color: #d9534f;
  margin-bottom: 16px;
}

.buttonGroup {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.cartButton {
  width: 42px;
  height: 42px;
  padding: 0;
  background-color: #5bc0de;
  color: white;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buyButton {
  flex: 1;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
}

.cartButton:hover {
  background-color: #31b0d5;
}

.buyButton:hover {
  background-color: #218838;
}

button:focus {
  outline: none;
}

@media (max-width: 768px) {
  .buttonGroup {
    flex-direction: column;
    align-items: stretch;
  }

  .cartButton,
  .buyButton {
    width: 100%;
  }
}

.favoriteIcon {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
}
</style>
