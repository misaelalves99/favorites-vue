<!-- src/components/Wishlist.vue -->

<script lang="ts" setup>
import { useWishlist } from "../context/WishlistContext";

const { wishlist, removeFromWishlist } = useWishlist();
</script>

<template>
  <div class="container">
    <h2 class="title">Lista de Desejos</h2>

    <p v-if="wishlist.length === 0" class="emptyMessage">
      Sua lista de desejos está vazia.
    </p>

    <div v-else class="grid">
      <div
        v-for="product in wishlist"
        :key="product.id"
        class="cardHorizontal"
      >
        <div class="imageSection">
          <img
            :src="product.imageUrl || '/images/product-placeholder.png'"
            :alt="product.name"
            width="120"
            height="120"
            class="image"
          />
        </div>

        <div class="infoSection">
          <h3 class="productName">{{ product.name }}</h3>
          <p class="productDescription">{{ product.description }}</p>
          <p class="productPrice">R$ {{ product.price.toFixed(2) }}</p>

          <button
            @click="removeFromWishlist(Number(product.id))"
            class="removeButton"
          >
            Remover da Lista
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.emptyMessage {
  color: #666;
  font-style: italic;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cardHorizontal {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;
}

.cardHorizontal:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.imageSection {
  flex-shrink: 0;
  margin-right: 1rem;
}

.image {
  border-radius: 8px;
  object-fit: cover;
}

.infoSection {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.productName {
  font-size: 1.2rem;
  font-weight: 600;
}

.productDescription {
  font-size: 0.9rem;
  color: #555;
}

.productPrice {
  font-weight: bold;
  margin-top: 0.2rem;
}

.removeButton {
  margin-top: 0.6rem;
  background-color: #e63946;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.2s;
}

.removeButton:hover {
  background-color: #c62828;
}
</style>
