<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getChapterById } from '@/data/curriculum'
import { useProgressStore } from '@/stores/progress'

const route = useRoute()
const router = useRouter()
const progressStore = useProgressStore()

const chapterId = computed(() => (route.params.chapterId as string) || 'tingkat-1')
const chapter = computed(() => getChapterById(chapterId.value))

const goBack = () => {
  router.push('/')
}

const startLearning = (subId: string) => {
  router.push(`/learn/${chapterId.value}/${subId}`)
}

const startTesting = (subId: string) => {
  router.push(`/test/${chapterId.value}/${subId}`)
}
</script>

<template>
  <VContainer class="py-4 py-sm-8 max-w-1200 px-3 px-sm-6">
    <!-- Header Navigation -->
    <div class="d-flex align-center mb-4 mb-sm-6">
      <VBtn
        icon="mdi-arrow-left"
        variant="tonal"
        color="medium-emphasis"
        size="small"
        class="mr-3"
        @click="goBack"
      />
      <div>
        <div class="text-caption text-primary font-weight-bold">
          KURIKULUM UTAMA
        </div>
        <h1 class="text-h5 text-sm-h4 font-weight-bold">
          {{ chapter?.title || 'Tingkat 1: Dasar Aritmatika' }}
        </h1>
      </div>
    </div>

    <p class="text-body-2 text-sm-body-1 text-medium-emphasis mb-6">
      {{ chapter?.description }}
    </p>

    <!-- Sub-Chapters List -->
    <div class="text-subtitle-1 text-sm-h6 font-weight-bold mb-4 d-flex align-center">
      <VIcon icon="mdi-format-list-bulleted-square" color="primary" class="mr-2" size="22" />
      Daftar Sub-Bab Pembelajaran & Tes
    </div>

    <VRow>
      <VCol
        v-for="(sub, index) in chapter?.subChapters || []"
        :key="sub.id"
        cols="12"
      >
        <VCard class="pa-4 pa-sm-5 rounded-xl border bg-surface" flat>
          <VRow align="center">
            <VCol cols="auto" class="pr-0">
              <VAvatar color="primary" variant="tonal" size="40" class="font-weight-bold">
                {{ index + 1 }}
              </VAvatar>
            </VCol>

            <VCol cols="12" sm="6" md="7">
              <div class="d-flex align-center flex-wrap gap-2 mb-1">
                <div class="text-subtitle-1 text-sm-h6 font-weight-bold mr-1">
                  {{ sub.title }}
                </div>

                <VChip
                  v-if="progressStore.isSubChapterCompleted(sub.id)"
                  color="success"
                  size="x-small"
                  variant="elevated"
                  class="font-weight-bold"
                >
                  <VIcon icon="mdi-check-all" class="mr-1" size="14" /> Selesai
                </VChip>
              </div>

              <p class="text-caption text-medium-emphasis mb-2">
                {{ sub.description }}
              </p>

              <div class="d-flex align-center flex-wrap gap-2 text-caption text-medium-emphasis">
                <span class="d-flex align-center mr-2">
                  <VIcon icon="mdi-clock-outline" size="14" class="mr-1" />
                  {{ sub.estimatedTimeMinutes }} Menit
                </span>
                <span class="d-flex align-center mr-2">
                  <VIcon icon="mdi-book-open-outline" size="14" class="mr-1" />
                  {{ sub.learningSteps.length }} Langkah
                </span>
                <span class="d-flex align-center mr-2">
                  <VIcon icon="mdi-help-circle-outline" size="14" class="mr-1" />
                  {{ sub.questions.length }} Soal
                </span>
                <span v-if="progressStore.getSubChapterScore(sub.id) !== null" class="text-secondary font-weight-bold">
                  Skor: {{ progressStore.getSubChapterScore(sub.id) }}%
                </span>
              </div>
            </VCol>

            <VCol cols="12" sm="5" md="4" class="d-flex flex-column flex-sm-row justify-sm-end gap-2 mt-2 mt-sm-0">
              <!-- Learn Module Button -->
              <VBtn
                color="primary"
                variant="elevated"
                prepend-icon="mdi-school"
                class="rounded-lg text-none flex-grow-1 flex-sm-grow-0"
                @click="startLearning(sub.id)"
              >
                Modul Belajar
              </VBtn>

              <!-- Test Module Button -->
              <VBtn
                color="secondary"
                variant="tonal"
                prepend-icon="mdi-clipboard-check-outline"
                class="rounded-lg text-none flex-grow-1 flex-sm-grow-0"
                @click="startTesting(sub.id)"
              >
                Modul Tes
              </VBtn>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.max-w-1200 {
  max-width: 1200px;
}
.gap-2 {
  gap: 8px;
}
</style>
