<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  initialValue?: number
  secondaryValue?: number
  operation?: '+' | '-'
  interactive?: boolean
}>()

const startVal = ref(props.initialValue ?? 5)
const hopVal = ref(props.secondaryValue ?? 3)
const isAdd = computed(() => (props.operation ?? '+') === '+')

const endVal = computed(() => {
  return isAdd.value ? startVal.value + hopVal.value : startVal.value - hopVal.value
})

const maxLine = 15
</script>

<template>
  <VCard class="pa-3 pa-sm-4 bg-surface-variant rounded-xl text-center" flat>
    <div class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold mb-1">
      <VIcon icon="mdi-ray-start-end" color="secondary" class="mr-1" size="20" />
      Simulasi Garis Bilangan:
      <span class="text-secondary font-weight-bold">
        {{ startVal }} {{ isAdd ? '+' : '-' }} {{ hopVal }} = {{ endVal }}
      </span>
    </div>

    <div class="py-4 py-sm-6 px-1 overflow-x-auto custom-scroll">
      <div class="d-flex align-center justify-space-between position-relative px-4 min-w-450">
        <!-- Connecting Line -->
        <div class="number-line-axis"></div>

        <!-- Ticks -->
        <div
          v-for="num in maxLine + 1"
          :key="num - 1"
          class="tick-container text-center position-relative"
          :class="{
            'active-start': num - 1 === startVal,
            'active-end': num - 1 === endVal,
          }"
        >
          <div class="tick-mark mx-auto"></div>
          <div class="text-caption font-weight-bold mt-1">
            {{ num - 1 }}
          </div>

          <!-- Indicator Badges -->
          <VChip
            v-if="num - 1 === startVal"
            size="x-small"
            color="info"
            class="position-absolute start-badge font-weight-bold"
          >
            Mulai
          </VChip>

          <VChip
            v-if="num - 1 === endVal"
            size="x-small"
            color="success"
            class="position-absolute end-badge font-weight-bold"
          >
            Hasil
          </VChip>
        </div>
      </div>
    </div>
  </VCard>
</template>

<style scoped>
.min-w-450 {
  min-width: 450px;
}

.number-line-axis {
  position: absolute;
  top: 50%;
  left: 16px;
  right: 16px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%);
  z-index: 1;
}

.tick-container {
  z-index: 2;
  width: 22px;
}

.tick-mark {
  width: 3px;
  height: 16px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
}

.active-start .tick-mark {
  background: #3b82f6;
  height: 24px;
}

.active-end .tick-mark {
  background: #10b981;
  height: 24px;
}

.start-badge {
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
}

.end-badge {
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
