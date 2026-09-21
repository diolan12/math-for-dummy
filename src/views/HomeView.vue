<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { curriculumChapters } from '@/data/curriculum'
import { useProgressStore } from '@/stores/progress'

const router = useRouter()
const progressStore = useProgressStore()

const openChapter = (chapterId: string, isUnlocked: boolean) => {
  if (isUnlocked) {
    router.push(`/chapter/${chapterId}`)
  }
}

const tingkat1CompletedCount = computed(() => {
  const t1 = curriculumChapters[0]
  if (!t1) return 0
  return t1.subChapters.filter((sub) =>
    progressStore.isSubChapterCompleted(sub.id)
  ).length
})

const totalTingkat1 = computed(() => curriculumChapters[0]?.subChapters.length ?? 8)
const progressPercentage = computed(() =>
  Math.round((tingkat1CompletedCount.value / totalTingkat1.value) * 100)
)
</script>

<template>
  <VContainer class="py-4 py-sm-8 max-w-1200 px-3 px-sm-6">
    <!-- Hero Banner -->
    <VCard class="pa-4 pa-sm-6 rounded-2xl bg-gradient-hero border mb-6 mb-sm-8 text-white" flat>
      <VRow align="center">
        <VCol cols="12" md="8">
          <VChip color="secondary" size="small" variant="elevated" class="mb-3 font-weight-bold">
            <VIcon icon="mdi-sparkles" class="mr-1" size="16" /> Tingkat 1 Siap Dipelajari
          </VChip>
          <h1 class="text-h5 text-sm-h4 font-weight-bold mb-2">
            Belajar Matematika dari Nol Hingga Mahir!
          </h1>
          <p class="text-body-2 text-sm-body-1 text-medium-emphasis mb-4">
            Pilih modul tingkat dasar di bawah ini. Pelajari materi secara visual dan uji pemahamanmu dengan modul tes interaktif.
          </p>

          <div class="d-flex flex-column flex-sm-row align-start align-sm-center gap-3">
            <div class="w-100 max-w-300">
              <div class="d-flex justify-space-between text-caption font-weight-bold mb-1">
                <span>Progres Tingkat 1</span>
                <span>{{ progressPercentage }}%</span>
              </div>
              <VProgressLinear
                :model-value="progressPercentage"
                color="secondary"
                height="10"
                rounded
              />
            </div>
            <span class="text-caption text-medium-emphasis">
              {{ tingkat1CompletedCount }} / {{ totalTingkat1 }} Bab Selesai
            </span>
          </div>
        </VCol>

        <VCol cols="12" md="4" class="text-center d-none d-md-block">
          <VAvatar color="primary-lighten-4" size="110" class="pa-4 bg-surface-variant">
            <VIcon icon="mdi-school" size="56" color="primary" />
          </VAvatar>
        </VCol>
      </VRow>
    </VCard>

    <!-- Curriculum Level Roadmap Grid -->
    <div class="text-h6 text-sm-h5 font-weight-bold mb-4 d-flex align-center">
      <VIcon icon="mdi-map-marker-path" color="primary" class="mr-2" size="24" />
      Peta Kurikulum Pembelajaran
    </div>

    <VRow>
      <VCol
        v-for="chapter in curriculumChapters"
        :key="chapter.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <VCard
          class="h-100 rounded-xl pa-4 pa-sm-5 transition-all card-hover border d-flex flex-column"
          :class="{
            'cursor-pointer': chapter.isUnlocked,
            'locked-card': !chapter.isUnlocked,
          }"
          flat
          @click="openChapter(chapter.id, chapter.isUnlocked)"
        >
          <div class="d-flex align-center justify-space-between mb-3">
            <VAvatar
              :color="chapter.isUnlocked ? 'primary' : 'surface-variant'"
              size="44"
              class="shadow-sm"
            >
              <VIcon :icon="chapter.icon" color="white" size="24" />
            </VAvatar>

            <VChip
              :color="chapter.isUnlocked ? 'success' : 'grey'"
              size="x-small"
              variant="tonal"
              class="font-weight-bold px-2"
            >
              <VIcon
                :icon="chapter.isUnlocked ? 'mdi-check-circle' : 'mdi-lock'"
                class="mr-1"
                size="14"
              />
              {{ chapter.isUnlocked ? 'Terbuka' : 'Segera Hadir' }}
            </VChip>
          </div>

          <div class="text-subtitle-1 text-sm-h6 font-weight-bold mb-1">
            {{ chapter.title }}
          </div>
          <div class="text-caption text-sm-subtitle-2 text-primary font-weight-medium mb-2">
            {{ chapter.subtitle }}
          </div>
          <p class="text-caption text-medium-emphasis mb-4 flex-grow-1">
            {{ chapter.description }}
          </p>

          <VDivider class="my-3" />

          <div class="d-flex align-center justify-space-between text-caption font-weight-bold">
            <span v-if="chapter.isUnlocked" class="text-secondary d-flex align-center">
              <VIcon icon="mdi-book-open-page-variant" size="16" class="mr-1" />
              {{ chapter.subChapters.length }} Sub-Bab Interaktif
            </span>
            <span v-else class="text-medium-emphasis">
              Persiapan Kurikulum
            </span>

            <VBtn
              v-if="chapter.isUnlocked"
              size="small"
              color="primary"
              variant="tonal"
              append-icon="mdi-arrow-right"
              class="text-none font-weight-bold"
            >
              Mulai
            </VBtn>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.max-w-1200 {
  max-width: 1200px;
}
.max-w-300 {
  max-width: 300px;
}
.bg-gradient-hero {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.card-hover {
  transition: all 0.25s ease-in-out;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -10px rgba(99, 102, 241, 0.3) !important;
}
.locked-card {
  opacity: 0.65;
  filter: grayscale(0.4);
}
.gap-3 {
  gap: 12px;
}
</style>
