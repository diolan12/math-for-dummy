<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSubChapterById } from '@/data/curriculum'
import { useProgressStore } from '@/stores/progress'
import NumberBlocksWidget from '@/components/widgets/NumberBlocksWidget.vue'
import NumberLineWidget from '@/components/widgets/NumberLineWidget.vue'
import MultiplicationGridWidget from '@/components/widgets/MultiplicationGridWidget.vue'
import BodmasVisualizerWidget from '@/components/widgets/BodmasVisualizerWidget.vue'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

const chapterId = computed(() => (route.params.chapterId as string) || 'tingkat-1')
const subId = computed(() => (route.params.subId as string) || '1-1')

const subChapter = computed(() => getSubChapterById(chapterId.value, subId.value))
const currentStepIndex = ref(0)

const currentStep = computed(() => {
  return subChapter.value?.learningSteps[currentStepIndex.value]
})

const totalSteps = computed(() => subChapter.value?.learningSteps.length ?? 1)
const progressValue = computed(() =>
  Math.round(((currentStepIndex.value + 1) / totalSteps.value) * 100)
)

const nextStep = () => {
  if (currentStepIndex.value < totalSteps.value - 1) {
    currentStepIndex.value++
  } else {
    // Finish lesson
    progressStore.markSubChapterComplete(subId.value, 50)
    router.push(`/test/${chapterId.value}/${subId.value}`)
  }
}

const prevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

const exitLesson = () => {
  router.push(`/chapter/${chapterId.value}`)
}
</script>

<template>
  <VContainer class="py-4 py-sm-6 max-w-900 px-3 px-sm-6">
    <!-- Top Header -->
    <div class="d-flex align-center justify-space-between mb-4">
      <VBtn
        icon="mdi-close"
        variant="tonal"
        color="medium-emphasis"
        size="small"
        @click="exitLesson"
      />

      <div class="flex-grow-1 mx-2 mx-sm-4 max-w-500">
        <div class="d-flex justify-space-between text-caption font-weight-bold mb-1">
          <span class="text-truncate mr-2">{{ subChapter?.title }}</span>
          <span class="flex-shrink-0">{{ currentStepIndex + 1 }}/{{ totalSteps }}</span>
        </div>
        <VProgressLinear
          :model-value="progressValue"
          color="primary"
          height="8"
          rounded
        />
      </div>

      <VChip color="primary" variant="tonal" size="small" class="font-weight-bold d-none d-sm-inline-flex">
        <VIcon icon="mdi-school" class="mr-1" /> Belajar
      </VChip>
    </div>

    <!-- Lesson Card -->
    <VCard v-if="currentStep" class="pa-4 pa-sm-6 rounded-2xl border bg-surface" flat>
      <div class="d-flex align-center mb-3">
        <VChip color="primary" size="small" variant="elevated" class="mr-2 font-weight-bold">
          Langkah {{ currentStepIndex + 1 }}
        </VChip>
        <h2 class="text-subtitle-1 text-sm-h5 font-weight-bold">
          {{ currentStep.title }}
        </h2>
      </div>

      <!-- Explanation Content -->
      <p class="text-body-2 text-sm-body-1 text-medium-emphasis whitespace-pre-line mb-6 leading-relaxed">
        {{ currentStep.explanation }}
      </p>

      <!-- Dynamic Visual Interactive Widget -->
      <div v-if="currentStep.visualWidget" class="my-6">
        <NumberBlocksWidget
          v-if="currentStep.visualWidget.type === 'number-blocks'"
          :initial-value="currentStep.visualWidget.initialValue"
          :interactive="currentStep.visualWidget.interactive"
        />

        <NumberLineWidget
          v-if="currentStep.visualWidget.type === 'number-line'"
          :initial-value="currentStep.visualWidget.initialValue"
          :secondary-value="currentStep.visualWidget.secondaryValue"
          :operation="currentStep.visualWidget.operation as '+' | '-'"
          :interactive="currentStep.visualWidget.interactive"
        />

        <MultiplicationGridWidget
          v-if="currentStep.visualWidget.type === 'multiplication-grid'"
          :initial-value="currentStep.visualWidget.initialValue"
          :secondary-value="currentStep.visualWidget.secondaryValue"
          :operation="currentStep.visualWidget.operation"
          :interactive="currentStep.visualWidget.interactive"
        />

        <BodmasVisualizerWidget
          v-if="currentStep.visualWidget.type === 'bodmas-visualizer'"
          :expression="currentStep.visualWidget.expression"
          :interactive="currentStep.visualWidget.interactive"
        />
      </div>

      <!-- Example Problem Card -->
      <VCard
        v-if="currentStep.exampleProblem"
        class="pa-3 pa-sm-4 bg-surface-variant rounded-xl border mb-6"
        flat
      >
        <div class="text-subtitle-2 font-weight-bold text-primary mb-2 d-flex align-center">
          <VIcon icon="mdi-lightbulb-on" color="primary" class="mr-1" />
          Contoh soal: {{ currentStep.exampleProblem.question }}
        </div>

        <div class="text-caption text-medium-emphasis mb-2">
          <div
            v-for="(step, idx) in currentStep.exampleProblem.stepByStep"
            :key="idx"
            class="my-1"
          >
            {{ step }}
          </div>
        </div>

        <VChip size="small" color="success" variant="elevated" class="font-weight-bold mt-1">
          Jawaban: {{ currentStep.exampleProblem.answer }}
        </VChip>
      </VCard>

      <!-- Key Takeaway Alert -->
      <VAlert
        type="success"
        variant="tonal"
        icon="mdi-check-decagram"
        class="rounded-xl mb-6 text-caption text-sm-body-2 pa-3 pa-sm-4"
      >
        <strong>Kunci Pemahaman:</strong> {{ currentStep.keyTakeaway }}
      </VAlert>

      <VDivider class="mb-6" />

      <!-- Action Footer -->
      <div class="d-flex flex-column-reverse flex-sm-row justify-space-between align-stretch align-sm-center gap-3">
        <VBtn
          color="medium-emphasis"
          variant="tonal"
          prepend-icon="mdi-arrow-left"
          :disabled="currentStepIndex === 0"
          class="text-none"
          @click="prevStep"
        >
          Sebelumnya
        </VBtn>

        <VBtn
          color="primary"
          variant="elevated"
          append-icon="mdi-arrow-right"
          class="px-6 font-weight-bold text-none"
          @click="nextStep"
        >
          {{ currentStepIndex === totalSteps - 1 ? 'Mulai Tes Pemahaman' : 'Lanjut' }}
        </VBtn>
      </div>
    </VCard>
  </VContainer>
</template>

<style scoped>
.max-w-900 {
  max-width: 900px;
}
.max-w-500 {
  max-width: 500px;
}
.whitespace-pre-line {
  white-space: pre-line;
}
.leading-relaxed {
  line-height: 1.7;
}
.gap-3 {
  gap: 12px;
}
</style>
