<!-- src/components/Footer.vue -->

<template>
  <footer class="footer">
    <div class="container">
      <p class="text">
        &copy; {{ currentYear }} E-commerce. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background-color: #212529;
  color: #f8f9fa;
  padding: 2rem 1rem;
  text-align: center;
  border-top: 1px solid #343a40;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #adb5bd;
}

@media (max-width: 600px) {
  .text {
    font-size: 0.85rem;
  }
}
</style>
