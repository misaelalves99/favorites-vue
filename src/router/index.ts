import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/home/HomePage.vue';
import ProductsPage from '../pages/products/ProductsPage.vue';
import FavoritesPage from '../pages/favorites/FavoritesPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/products', name: 'Products', component: ProductsPage },
  { path: '/favorites', name: 'Favorites', component: FavoritesPage },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
