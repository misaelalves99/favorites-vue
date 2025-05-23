<!-- src/pages/products/ProductsPage.vue -->

<template>
  <div class="container">
    <h1 class="title">Lista de Produtos</h1>

    <p v-if="loading" class="loadingMessage">Carregando...</p>
    <p v-if="error" class="errorMessage">{{ error }}</p>
    <p v-if="!loading && !error && products.length === 0" class="noProductsText">
      Nenhum produto encontrado.
    </p>

    <ProductList v-if="!loading && !error && products.length > 0" :products="products" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import ProductList from "../../components/ProductList.vue";
import { getProducts } from "../../services/productService";
import type { Product } from "../../types/product";

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const fetched: Product[] = await getProducts();
    products.value = fetched;
  } catch (err) {
    error.value = "Erro ao carregar os produtos.";
    console.error("Erro ao buscar produtos:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.loadingMessage {
  font-size: 1.25rem;
  color: #666;
  text-align: center;
}

.errorMessage {
  font-size: 1.25rem;
  color: #f44336;
  text-align: center;
}

.noProductsText {
  font-size: 1.125rem;
  color: #888;
  text-align: center;
}

.productListContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
</style>
