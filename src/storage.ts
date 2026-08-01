import type { Card, StoredState } from './types'

const KEY = 'chao-nha-v1.0'
const defaults = (): StoredState => ({ version: 2, progress: {}, personalCards: [], goal: 8, stats: { currentStreak: 0, bestStreak: 0 } })

export function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaults()
    const saved = JSON.parse(raw) as Partial<StoredState>
    return { ...defaults(), ...saved, version: 2, progress: saved.progress ?? {}, personalCards: saved.personalCards ?? [], stats: saved.stats ?? defaults().stats }
  } catch { return defaults() }
}

export function saveState(state: StoredState) { localStorage.setItem(KEY, JSON.stringify(state)) }
export function resetState() { localStorage.removeItem(KEY) }
export function createPersonalCard(input: Omit<Card, 'id' | 'category' | 'isPersonal'>): Card {
  return { ...input, id: `personal-${Date.now()}`, category: 'Eigene', isPersonal: true }
}
