<!-- src/components/FavoriteButton.vue -->

<template>
  <div class="button">
    <Heart class="icon" />
    <span
      v-if="wishlist.length > 0"
      class="count"
    >
      {{ wishlist.length }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-vue-next';

const { wishlist } = useWishlist();
</script>

<style scoped>
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #d63031;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.button:hover {
  color: #e84342;
}

.icon {
  font-size: 1.5rem;
}

.count {
  position: absolute;
  top: -6px;
  right: -10px;
  background-color: #d63031;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;
}
</style>
