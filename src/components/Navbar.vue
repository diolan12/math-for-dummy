<script setup lang="ts">
import { useProgressStore } from '@/stores/progress'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const progressStore = useProgressStore()
const router = useRouter()
const theme = useTheme()

const goHome = () => {
  router.push('/')
}

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <VAppBar flat color="surface" class="border-b px-2 px-sm-4" density="comfortable">
    <VContainer class="d-flex align-center max-w-1200 py-0 px-2 px-sm-4">
      <!-- Brand Logo -->
      <div
        class="d-flex align-center cursor-pointer brand-logo"
        @click="goHome"
      >
        <VAvatar color="primary" size="36" class="mr-2 mr-sm-3 shadow-sm">
          <VIcon icon="mdi-calculator-variant-outline" color="white" size="20" />
        </VAvatar>

        <div>
          <div class="text-subtitle-1 text-sm-h6 font-weight-bold text-gradient-primary leading-tight">
            Math for Dummy
          </div>
          <div class="text-caption text-medium-emphasis d-none d-sm-block">
            Aritmatika Dasar & Kurikulum Lengkap
          </div>
        </div>
      </div>

      <VSpacer />

      <!-- Stats Bar & Controls -->
      <div class="d-flex align-center gap-1 gap-sm-2">
        <!-- Streak Chip -->
        <VChip
          color="warning"
          variant="tonal"
          size="small"
          class="font-weight-bold px-2 px-sm-3"
        >
          <VIcon icon="mdi-fire" color="warning" class="mr-1" size="16" />
          <span>{{ progressStore.streakCount }}</span>
          <span class="d-none d-sm-inline ml-1">Hari</span>
        </VChip>

        <!-- XP Chip -->
        <VChip
          color="primary"
          variant="tonal"
          size="small"
          class="font-weight-bold px-2 px-sm-3"
        >
          <VIcon icon="mdi-star" color="primary" class="mr-1" size="16" />
          <span>{{ progressStore.xpPoints }}</span>
          <span class="d-none d-sm-inline ml-1">XP</span>
        </VChip>

        <!-- Theme Switcher Button -->
        <VBtn
          :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"
          variant="text"
          color="medium-emphasis"
          density="comfortable"
          @click="toggleTheme"
        />

        <!-- Home Navigation Button -->
        <VBtn
          icon="mdi-home"
          variant="text"
          color="medium-emphasis"
          density="comfortable"
          @click="goHome"
        />
      </div>
    </VContainer>
  </VAppBar>
</template>

<style scoped>
.brand-logo {
  user-select: none;
  transition: transform 0.2s ease;
}
.brand-logo:hover {
  transform: translateY(-1px);
}
.text-gradient-primary {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.max-w-1200 {
  max-width: 1200px;
}
.gap-1 {
  gap: 4px;
}
.gap-sm-2 {
  gap: 8px;
}
</style>
