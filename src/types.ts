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

export type CardProgress = { interval: number; due: number; seen: number }
export type ProgressMap = Record<string, CardProgress>

export type StoredState = {
  version: 1
  progress: ProgressMap
  personalCards: Card[]
  goal: number
  voiceId?: string
}

export type Page = 'home' | 'learn' | 'topics' | 'tones' | 'personal'
