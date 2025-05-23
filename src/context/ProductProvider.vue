<!-- src/context/ProductProvider.vue -->

<template>
  <slot />
</template>

<script setup lang="ts">
import { provideProduct } from "../composables/useProduct";

provideProduct();
</script>
