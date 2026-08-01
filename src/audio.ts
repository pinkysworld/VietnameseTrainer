let pendingSpeech: number | undefined
let speechRequest = 0

export function vietnameseVoices() {
  return window.speechSynthesis?.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith('vi')) ?? []
}

function qualityScore(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase()
  return (voice.localService ? 10 : 0) + (/(siri|premium|natural|enhanced)/.test(name) ? 100 : 0) - (/(google|microsoft|espeak)/.test(name) ? 15 : 0)
}

export function vietnameseVoice(voiceId?: string) {
  const voices = vietnameseVoices()
  return voices.find((voice) => voice.voiceURI === voiceId) ?? [...voices].sort((a, b) => qualityScore(b) - qualityScore(a))[0]
}

export function speak(text: string, slow = false, voiceId?: string): boolean {
  if (!('speechSynthesis' in window)) return false
  const voice = vietnameseVoice(voiceId)
  if (!voice) return false
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = voice.lang
  utterance.rate = slow ? 0.58 : 0.86
  utterance.pitch = 1
  utterance.voice = voice
  const request = ++speechRequest
  const start = () => { if (request === speechRequest) window.speechSynthesis.speak(utterance) }
  if (pendingSpeech || window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    window.speechSynthesis.cancel()
    if (pendingSpeech) window.clearTimeout(pendingSpeech)
    pendingSpeech = window.setTimeout(() => { pendingSpeech = undefined; start() }, 80)
  } else start()
  return true
}
