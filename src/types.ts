export type Category = 'Begrüßung' | 'Familie' | 'Zuhause' | 'Essen' | 'Bitten' | 'Gefühle' | 'Antworten' | 'Unterwegs' | 'Eigene'

export type Card = {
  id: string
  vietnamese: string
  german: string
  english: string
  phonetic: string
  syllables: string
  note: string
  category: Category
  isPersonal?: boolean
}

export type CardProgress = { interval: number; due: number; seen: number; lapses?: number; lastReviewed?: number }
export type ProgressMap = Record<string, CardProgress>
export type StudyStats = { lastStudyDay?: string; currentStreak: number; bestStreak: number }

export type StoredState = {
  version: 2
  progress: ProgressMap
  personalCards: Card[]
  goal: number
  voiceId?: string
  stats: StudyStats
}

export type Page = 'home' | 'learn' | 'topics' | 'tones' | 'personal' | 'listen' | 'dialogues' | 'addresses'
