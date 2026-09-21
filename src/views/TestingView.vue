<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSubChapterById } from '@/data/curriculum'
import { useProgressStore } from '@/stores/progress'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

const chapterId = computed(() => (route.params.chapterId as string) || 'tingkat-1')
const subId = computed(() => (route.params.subId as string) || '1-1')

const subChapter = computed(() => getSubChapterById(chapterId.value, subId.value))
const questions = computed(() => subChapter.value?.questions || [])

const currentQuestionIndex = ref(0)
const selectedAnswers = ref<Record<number, number>>({})
const isSubmitted = ref(false)
const showResultDialog = ref(false)

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const totalQuestions = computed(() => questions.value.length)

const selectOption = (optIndex: number) => {
  if (isSubmitted.value) return
  selectedAnswers.value[currentQuestionIndex.value] = optIndex
}

const isCurrentAnswered = computed(() => {
  return selectedAnswers.value[currentQuestionIndex.value] !== undefined
})

const correctCount = computed(() => {
  let count = 0
  questions.value.forEach((q, idx) => {
    if (selectedAnswers.value[idx] === q.correctAnswer) {
      count++
    }
  })
  return count
})

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((correctCount.value / totalQuestions.value) * 100)
})

const nextQuestion = () => {
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++
  }
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const submitQuiz = () => {
  isSubmitted.value = true
  progressStore.saveQuizResult(subId.value, scorePercentage.value)
  showResultDialog.value = true
}

const exitQuiz = () => {
  router.push(`/chapter/${chapterId.value}`)
}

const retryQuiz = () => {
  selectedAnswers.value = {}
  currentQuestionIndex.value = 0
  isSubmitted.value = false
  showResultDialog.value = false
}

const nextSubChapter = () => {
  showResultDialog.value = false
  router.push(`/chapter/${chapterId.value}`)
}
</script>

<template>
  <VContainer class="py-4 py-sm-6 max-w-900 px-3 px-sm-6">
    <!-- Top Bar -->
    <div class="d-flex align-center justify-space-between mb-4">
      <VBtn
        icon="mdi-close"
        variant="tonal"
        color="medium-emphasis"
        size="small"
        @click="exitQuiz"
      />

      <div class="flex-grow-1 mx-2 mx-sm-4 max-w-500">
        <div class="d-flex justify-space-between text-caption font-weight-bold mb-1">
          <span class="text-truncate mr-2">Tes: {{ subChapter?.title }}</span>
          <span class="flex-shrink-0">{{ currentQuestionIndex + 1 }}/{{ totalQuestions }}</span>
        </div>
        <VProgressLinear
          :model-value="((currentQuestionIndex + 1) / totalQuestions) * 100"
          color="secondary"
          height="8"
          rounded
        />
      </div>

      <VChip color="secondary" variant="tonal" size="small" class="font-weight-bold d-none d-sm-inline-flex">
        <VIcon icon="mdi-clipboard-text-outline" class="mr-1" /> Tes
      </VChip>
    </div>

    <!-- Question Card -->
    <VCard v-if="currentQuestion" class="pa-4 pa-sm-6 rounded-2xl border bg-surface" flat>
      <div class="d-flex align-center justify-space-between mb-4">
        <VChip color="secondary" size="small" variant="elevated" class="font-weight-bold">
          Soal {{ currentQuestionIndex + 1 }}
        </VChip>

        <span v-if="isSubmitted" class="text-caption font-weight-bold">
          <VIcon
            :icon="selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? 'mdi-check-circle' : 'mdi-close-circle'"
            :color="selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? 'success' : 'error'"
            class="mr-1"
          />
          {{ selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? 'Jawaban Benar' : 'Jawaban Salah' }}
        </span>
      </div>

      <h2 class="text-subtitle-1 text-sm-h6 font-weight-bold mb-6">
        {{ currentQuestion.prompt }}
      </h2>

      <!-- Options List -->
      <div class="d-flex flex-column gap-3 mb-6">
        <VCard
          v-for="(option, optIdx) in currentQuestion.options"
          :key="optIdx"
          class="pa-3 pa-sm-4 rounded-xl border cursor-pointer option-card transition-all"
          :class="{
            'selected-option': selectedAnswers[currentQuestionIndex] === optIdx,
            'correct-option': isSubmitted && currentQuestion.correctAnswer === optIdx,
            'wrong-option': isSubmitted && selectedAnswers[currentQuestionIndex] === optIdx && currentQuestion.correctAnswer !== optIdx,
          }"
          flat
          @click="selectOption(optIdx)"
        >
          <div class="d-flex align-center">
            <VAvatar
              size="28"
              :color="selectedAnswers[currentQuestionIndex] === optIdx ? 'primary' : 'surface-variant'"
              class="mr-3 font-weight-bold text-caption flex-shrink-0"
            >
              {{ String.fromCharCode(65 + optIdx) }}
            </VAvatar>
            <span class="text-body-2 text-sm-body-1 font-weight-medium">{{ option }}</span>
          </div>
        </VCard>
      </div>

      <!-- Explanation after Submit -->
      <VAlert
        v-if="isSubmitted"
        type="info"
        variant="tonal"
        icon="mdi-text-box-search-outline"
        class="rounded-xl mb-6 text-caption text-sm-body-2 pa-3 pa-sm-4"
      >
        <strong>Penjelasan Solusi:</strong> {{ currentQuestion.explanation }}
      </VAlert>

      <VDivider class="mb-6" />

      <!-- Footer Action Buttons -->
      <div class="d-flex flex-column-reverse flex-sm-row justify-space-between align-stretch align-sm-center gap-3">
        <VBtn
          color="medium-emphasis"
          variant="tonal"
          prepend-icon="mdi-arrow-left"
          :disabled="currentQuestionIndex === 0"
          class="text-none"
          @click="prevQuestion"
        >
          Sebelumnya
        </VBtn>

        <VBtn
          v-if="currentQuestionIndex < totalQuestions - 1"
          color="primary"
          variant="elevated"
          append-icon="mdi-arrow-right"
          class="text-none font-weight-bold"
          :disabled="!isCurrentAnswered && !isSubmitted"
          @click="nextQuestion"
        >
          Selanjutnya
        </VBtn>

        <VBtn
          v-else
          color="success"
          variant="elevated"
          prepend-icon="mdi-check-all"
          class="font-weight-bold text-none"
          :disabled="!isCurrentAnswered && !isSubmitted"
          @click="submitQuiz"
        >
          {{ isSubmitted ? 'Lihat Ringkasan Hasil' : 'Kirim Jawaban Tes' }}
        </VBtn>
      </div>
    </VCard>

    <!-- Quiz Result Modal Dialog -->
    <VDialog v-model="showResultDialog" max-width="480" persistent>
      <VCard class="pa-4 pa-sm-6 rounded-2xl text-center bg-surface" flat>
        <VAvatar
          :color="scorePercentage >= 60 ? 'success' : 'warning'"
          size="72"
          class="mx-auto mb-3"
        >
          <VIcon
            :icon="scorePercentage >= 60 ? 'mdi-trophy-outline' : 'mdi-emoticon-neutral-outline'"
            size="40"
            color="white"
          />
        </VAvatar>

        <h2 class="text-h6 text-sm-h5 font-weight-bold mb-1">
          {{ scorePercentage >= 60 ? 'Selamat! Anda Lulus Tes!' : 'Tetap Semangat!' }}
        </h2>
        <p class="text-caption text-medium-emphasis mb-3">
          Sub-bab: {{ subChapter?.title }}
        </p>

        <div class="text-h4 text-sm-h3 font-weight-bold text-primary mb-2">
          {{ scorePercentage }}%
        </div>
        <p class="text-caption text-sm-body-2 text-medium-emphasis mb-5">
          Anda menjawab <strong>{{ correctCount }}</strong> dari <strong>{{ totalQuestions }}</strong> soal dengan benar.
        </p>

        <div class="d-flex flex-column flex-sm-row justify-center gap-2 gap-sm-3">
          <VBtn
            color="medium-emphasis"
            variant="tonal"
            prepend-icon="mdi-refresh"
            class="text-none"
            @click="retryQuiz"
          >
            Coba Lagi
          </VBtn>

          <VBtn
            color="primary"
            variant="elevated"
            append-icon="mdi-arrow-right"
            class="text-none font-weight-bold"
            @click="nextSubChapter"
          >
            Kembali ke Bab
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<style scoped>
.max-w-900 {
  max-width: 900px;
}
.max-w-500 {
  max-width: 500px;
}
.gap-2 {
  gap: 8px;
}
.gap-3 {
  gap: 12px;
}
.option-card {
  transition: all 0.2s ease;
}
.option-card:hover {
  border-color: rgba(99, 102, 241, 0.5) !important;
  background-color: rgba(99, 102, 241, 0.05);
}
.selected-option {
  border-color: #6366f1 !important;
  background-color: rgba(99, 102, 241, 0.12) !important;
}
.correct-option {
  border-color: #10b981 !important;
  background-color: rgba(16, 185, 129, 0.15) !important;
}
.wrong-option {
  border-color: #ef4444 !important;
  background-color: rgba(239, 68, 68, 0.15) !important;
}
</style>
