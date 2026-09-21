<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <VApp>
    <Navbar />

    <VMain class="bg-background min-h-screen">
      <RouterView />
    </VMain>
  </VApp>
</template>

<style>
.min-h-screen {
  min-height: 100vh;
}
</style>
