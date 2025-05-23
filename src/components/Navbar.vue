<!-- src/components/Navbar.vue -->

<template>
  <nav class="navbar">
    <div class="container">
      <RouterLink to="/" class="logo">Meu E-Commerce</RouterLink>

      <div class="navLinks">
        <RouterLink
          to="/"
          :class="['link', currentPath === '/' ? 'active' : '']"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/products"
          :class="['link', currentPath === '/products' ? 'active' : '']"
        >
          Produtos
        </RouterLink>

        <RouterLink to="/favorites" class="link">
          <FavoriteButton />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import FavoriteButton from "./FavoriteButton.vue";

const route = useRoute();
const currentPath = ref(route.path);

watch(() => route.path, (newPath) => {
  currentPath.value = newPath;
});
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  color: #2563eb;
}

.navLinks {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.link {
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: #2563eb;
}

.active {
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
  padding-bottom: 0.2rem;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }

  .navLinks {
    margin-top: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .logo {
    font-size: 1.25rem;
  }
}
</style>
