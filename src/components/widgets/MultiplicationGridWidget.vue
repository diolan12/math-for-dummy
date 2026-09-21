<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  initialValue?: number
  secondaryValue?: number
  operation?: string
  interactive?: boolean
}>()

const rows = ref(props.initialValue ?? 3)
const cols = ref(props.secondaryValue ?? 4)

const totalDots = computed(() => rows.value * cols.value)
const isDivide = computed(() => props.operation === '/')
</script>

<template>
  <VCard class="pa-4 bg-surface-variant rounded-xl text-center" flat>
    <div class="text-subtitle-1 font-weight-bold mb-2">
      <VIcon icon="mdi-grid" color="accent" class="mr-1" />
      <span v-if="!isDivide">
        Matriks Kisi Perkalian:
        <span class="text-accent font-weight-bold">{{ rows }} × {{ cols }} = {{ totalDots }}</span>
      </span>
      <span v-else>
        Matriks Kisi Pembagian:
        <span class="text-accent font-weight-bold">{{ totalDots }} ÷ {{ cols }} = {{ rows }}</span>
      </span>
    </div>

    <div class="d-flex flex-column align-center justify-center my-4 overflow-x-auto">
      <div
        v-for="r in rows"
        :key="r"
        class="d-flex gap-2 my-1"
      >
        <div
          v-for="c in cols"
          :key="c"
          class="grid-dot d-flex align-center justify-center rounded-circle text-caption font-weight-bold text-white shadow-sm"
        >
          {{ (r - 1) * cols + c }}
        </div>
      </div>
    </div>

    <div v-if="interactive !== false" class="d-flex justify-center gap-4 align-center mt-3">
      <div class="d-flex align-center gap-2">
        <span class="text-caption font-weight-bold">Baris: {{ rows }}</span>
        <VBtn
          size="x-small"
          color="accent"
          variant="tonal"
          icon="mdi-minus"
          :disabled="rows <= 1"
          @click="rows--"
        />
        <VBtn
          size="x-small"
          color="accent"
          variant="tonal"
          icon="mdi-plus"
          :disabled="rows >= 8"
          @click="rows++"
        />
      </div>

      <div class="d-flex align-center gap-2">
        <span class="text-caption font-weight-bold">Kolom: {{ cols }}</span>
        <VBtn
          size="x-small"
          color="primary"
          variant="tonal"
          icon="mdi-minus"
          :disabled="cols <= 1"
          @click="cols--"
        />
        <VBtn
          size="x-small"
          color="primary"
          variant="tonal"
          icon="mdi-plus"
          :disabled="cols >= 8"
          @click="cols++"
        />
      </div>
    </div>
  </VCard>
</template>

<style scoped>
.grid-dot {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, #ec4899 0%, #d946ef 100%);
  box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.4);
  transition: all 0.2s ease;
}
.grid-dot:hover {
  transform: scale(1.15);
}
</style>
