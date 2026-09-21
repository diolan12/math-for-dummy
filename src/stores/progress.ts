import { defineStore } from 'pinia'
import type { UserProgressState } from '@/types/curriculum'

const STORAGE_KEY = 'math_for_dummy_user_progress_v1'

function getDefaultState(): UserProgressState {
  return {
    completedSubChapters: [],
    quizScores: {},
    xpPoints: 0,
    streakCount: 1,
    lastActiveDate: new Date().toISOString().split('T')[0] ?? '',
  }
}

export const useProgressStore = defineStore('progress', {
  state: (): UserProgressState => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e)
    }
    return getDefaultState()
  },

  getters: {
    isSubChapterCompleted: (state) => (id: string) => {
      return state.completedSubChapters.includes(id)
    },
    getSubChapterScore: (state) => (id: string) => {
      return state.quizScores[id] ?? null
    },
    totalCompletedCount: (state) => state.completedSubChapters.length,
  },

  actions: {
    markSubChapterComplete(subChapterId: string, earnedXp: number = 50) {
      if (!this.completedSubChapters.includes(subChapterId)) {
        this.completedSubChapters.push(subChapterId)
        this.xpPoints += earnedXp
      }
      this.updateStreak()
      this.saveToStorage()
    },

    saveQuizResult(subChapterId: string, scorePercentage: number) {
      const currentHighest = this.quizScores[subChapterId] ?? 0
      if (scorePercentage > currentHighest) {
        this.quizScores[subChapterId] = scorePercentage
      }
      
      // Award XP based on performance
      const earnedXp = Math.round((scorePercentage / 100) * 100)
      this.xpPoints += earnedXp

      if (scorePercentage >= 60) {
        this.markSubChapterComplete(subChapterId, 0)
      }

      this.updateStreak()
      this.saveToStorage()
    },

    updateStreak() {
      const today = new Date().toISOString().split('T')[0] ?? ''
      if (!this.lastActiveDate) {
        this.streakCount = 1
        this.lastActiveDate = today
      } else if (this.lastActiveDate !== today) {
        const lastDate = new Date(this.lastActiveDate)
        const currentDate = new Date(today)
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
          this.streakCount += 1
        } else if (diffDays > 1) {
          this.streakCount = 1
        }
        this.lastActiveDate = today
      }
    },

    resetProgress() {
      const defaultState = getDefaultState()
      this.completedSubChapters = defaultState.completedSubChapters
      this.quizScores = defaultState.quizScores
      this.xpPoints = defaultState.xpPoints
      this.streakCount = defaultState.streakCount
      this.lastActiveDate = defaultState.lastActiveDate
      this.saveToStorage()
    },

    saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          completedSubChapters: this.completedSubChapters,
          quizScores: this.quizScores,
          xpPoints: this.xpPoints,
          streakCount: this.streakCount,
          lastActiveDate: this.lastActiveDate,
        }))
      } catch (e) {
        console.error('Failed to save progress to localStorage', e)
      }
    },
  },
})
