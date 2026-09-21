export type WidgetType = 'number-blocks' | 'number-line' | 'multiplication-grid' | 'bodmas-visualizer'

export interface InteractiveWidgetConfig {
  type: WidgetType
  initialValue?: number
  secondaryValue?: number
  operation?: '+' | '-' | '*' | '/'
  expression?: string
  targetValue?: number
  interactive?: boolean
}

export interface LearningStep {
  id: string
  title: string
  explanation: string
  keyTakeaway: string
  visualWidget?: InteractiveWidgetConfig
  exampleProblem?: {
    question: string
    stepByStep: string[]
    answer: string
  }
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  correctAnswer: number // index 0-3
  explanation: string
  hint?: string
}

export interface SubChapter {
  id: string
  chapterId: string
  title: string
  description: string
  estimatedTimeMinutes: number
  icon: string
  learningSteps: LearningStep[]
  questions: QuizQuestion[]
}

export interface Chapter {
  id: string
  level: number
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  isUnlocked: boolean
  subChapters: SubChapter[]
}

export interface QuizAttempt {
  subChapterId: string
  score: number
  totalQuestions: number
  percentage: number
  completedAt: string
}

export interface UserProgressState {
  completedSubChapters: string[] // list of subChapter IDs
  quizScores: Record<string, number> // subChapterId -> highest percentage score
  xpPoints: number
  streakCount: number
  lastActiveDate: string | null
}
