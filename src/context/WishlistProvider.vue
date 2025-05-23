<!-- src/context/WishlistProvider.vue -->

<template>
  <slot />
</template>

<script setup lang="ts">
import { provideWishlist } from "./WishlistContext";

provideWishlist();
</script>
