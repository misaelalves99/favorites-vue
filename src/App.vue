<!-- src/App.vue -->

<template>
  <ProductProvider>
    <WishlistProvider>
      <Navbar />
      <main>
        <router-view />
      </main>
      <Footer />
    </WishlistProvider>
  </ProductProvider>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import ProductProvider from "./context/ProductProvider.vue";
import WishlistProvider from "./context/WishlistProvider.vue";
</script>
