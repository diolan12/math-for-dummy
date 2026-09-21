<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  expression?: string
  interactive?: boolean
}>()

const activeStep = ref(0)

const steps = [
  {
    expr: '5 + 3 × 4',
    note: 'Ekspresi Awal',
    highlight: 'KABATAKU: Cari Operasi Perkalian / Pembagian lebih dulu!',
    action: 'Prioritaskan (3 × 4)',
  },
  {
    expr: '5 + 12',
    note: 'Langkah 1: Selesaikan Perkalian (3 × 4 = 12)',
    highlight: 'Sekarang hanya tersisa operasi Penjumlahan.',
    action: 'Kerjakan (5 + 12)',
  },
  {
    expr: '17',
    note: 'Langkah 2: Selesaikan Penjumlahan',
    highlight: 'Hasil Akhir = 17!',
    action: 'Selesai!',
  },
]

const currentStep = computed(() => (steps[activeStep.value] ?? steps[0])!)
</script>

<template>
  <VCard class="pa-4 bg-surface-variant rounded-xl text-center" flat>
    <div class="text-subtitle-1 font-weight-bold mb-3">
      <VIcon icon="mdi-order-numeric-ascending" color="warning" class="mr-1" />
      Visualisasi Prioritas Operasi (KABATAKU)
    </div>

    <div class="d-flex align-center justify-center my-2">
      <VChip size="large" color="warning" variant="elevated" class="text-h6 font-weight-bold px-6">
        {{ currentStep.expr }}
      </VChip>
    </div>

    <div class="text-body-2 text-medium-emphasis my-2 font-weight-medium">
      {{ currentStep.note }}
    </div>

    <VAlert
      type="info"
      variant="tonal"
      density="compact"
      class="my-3 rounded-lg text-caption text-left"
    >
      {{ currentStep.highlight }}
    </VAlert>

    <div class="d-flex justify-center gap-2 mt-4">
      <VBtn
        size="small"
        color="warning"
        variant="tonal"
        icon="mdi-chevron-left"
        :disabled="activeStep === 0"
        @click="activeStep--"
      />
      <VChip size="small" variant="outlined" class="my-auto">
        Langkah {{ activeStep + 1 }} dari {{ steps.length }}
      </VChip>
      <VBtn
        size="small"
        color="warning"
        variant="tonal"
        icon="mdi-chevron-right"
        :disabled="activeStep === steps.length - 1"
        @click="activeStep++"
      />
    </div>
  </VCard>
</template>
