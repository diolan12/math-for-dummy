<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialValue?: number
  secondaryValue?: number
  interactive?: boolean
}>()

const count = ref(props.initialValue ?? 5)

const addBlock = () => {
  if (count.value < 25) count.value++
}

const removeBlock = () => {
  if (count.value > 1) count.value--
}
</script>

<template>
  <VCard class="pa-3 pa-sm-4 bg-surface-variant rounded-xl text-center" flat>
    <div class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold mb-2">
      <VIcon icon="mdi-cube-outline" color="primary" class="mr-1" size="20" />
      Visual Block Counter: <span class="text-primary text-subtitle-1 text-sm-h6 font-weight-bold">{{ count }}</span>
    </div>

    <div class="d-flex flex-wrap justify-center align-center gap-2 my-3 max-h-200 overflow-y-auto pa-1">
      <div
        v-for="n in count"
        :key="n"
        class="block-item d-flex align-center justify-center rounded-lg bg-primary text-white font-weight-bold text-caption shadow-sm"
      >
        {{ n }}
      </div>
    </div>

    <div v-if="interactive !== false" class="d-flex justify-center gap-3">
      <VBtn
        size="small"
        color="error"
        variant="tonal"
        icon="mdi-minus"
        :disabled="count <= 1"
        @click="removeBlock"
      />
      <VBtn
        size="small"
        color="success"
        variant="tonal"
        icon="mdi-plus"
        :disabled="count >= 25"
        @click="addBlock"
      />
    </div>
  </VCard>
</template>

<style scoped>
.block-item {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
  transition: all 0.2s ease-in-out;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@media (min-width: 600px) {
  .block-item {
    width: 40px;
    height: 40px;
  }
}

.max-h-200 {
  max-height: 200px;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
