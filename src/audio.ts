export function vietnameseVoice() {
  return window.speechSynthesis?.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('vi'))
}

export function speak(text: string, slow = false): boolean {
  if (!('speechSynthesis' in window)) return false
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'vi-VN'
  utterance.rate = slow ? 0.58 : 0.86
  utterance.pitch = 1
  const voice = vietnameseVoice()
  if (voice) utterance.voice = voice
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
  return Boolean(voice)
}
