export type Dialogue = {
  title: string
  situation: string
  lines: Array<{ speaker: string; vietnamese: string; german: string }>
  question: string
  correct: string
  choices: string[]
}

export const dialogues: Dialogue[] = [
  { title: 'Am Morgen', situation: 'Du triffst jemanden zum ersten Mal heute.', lines: [{ speaker: 'A', vietnamese: 'Chào buổi sáng!', german: 'Guten Morgen!' }, { speaker: 'B', vietnamese: 'Chào buổi sáng!', german: 'Guten Morgen!' }], question: 'Wie antwortest du passend?', correct: 'Chào buổi sáng!', choices: ['Chào buổi sáng!', 'Tính tiền', 'Không hiểu'] },
  { title: 'Beim Essen', situation: 'Das Essen schmeckt dir.', lines: [{ speaker: 'A', vietnamese: 'Ngon quá!', german: 'Sehr lecker!' }, { speaker: 'B', vietnamese: 'Cảm ơn nhé.', german: 'Danke!' }], question: 'Welcher Satz ist das Kompliment?', correct: 'Ngon quá!', choices: ['Ngon quá!', 'Đủ rồi', 'Nước'] },
  { title: 'Nicht verstanden', situation: 'Jemand spricht zu schnell.', lines: [{ speaker: 'A', vietnamese: 'Anh không hiểu.', german: 'Ich verstehe nicht.' }, { speaker: 'A', vietnamese: 'Nói chậm hơn nhé.', german: 'Sprich bitte langsamer.' }], question: 'Was sagst du als Nächstes?', correct: 'Nói chậm hơn nhé.', choices: ['Nói chậm hơn nhé.', 'Đi thôi.', 'Anh đói.'] },
  { title: 'Unterwegs', situation: 'Ihr seid bereit loszugehen.', lines: [{ speaker: 'A', vietnamese: 'Đi thôi!', german: 'Los geht’s!' }, { speaker: 'B', vietnamese: 'Đi đâu vậy?', german: 'Wohin geht es?' }], question: 'Welche Frage passt als Antwort?', correct: 'Đi đâu vậy?', choices: ['Đi đâu vậy?', 'Ngủ ngon nhé.', 'Không sao đâu.'] }
]

export const addressScenarios = [
  { prompt: 'Ein erwachsener Mann spricht mit einer jüngeren Frau.', detail: 'Wie nennt er sich selbst, und wie spricht er sie an?', correct: 'Ich: anh · Gegenüber: em', choices: ['Ich: anh · Gegenüber: em', 'Ich: em · Gegenüber: anh', 'Ich: con · Gegenüber: mẹ'] },
  { prompt: 'Eine jüngere Frau spricht mit einem älteren Mann.', detail: 'Welche beiden Anreden passen häufig?', correct: 'Ich: em · Gegenüber: anh', choices: ['Ich: chị · Gegenüber: em', 'Ich: em · Gegenüber: anh', 'Ich: mẹ · Gegenüber: con'] },
  { prompt: 'Ein Kind spricht mit seiner Mutter.', detail: 'Welche Familienanreden sind natürlich?', correct: 'Ich: con · Gegenüber: mẹ', choices: ['Ich: anh · Gegenüber: em', 'Ich: con · Gegenüber: mẹ', 'Ich: bà · Gegenüber: ông'] },
  { prompt: 'Eine jüngere Frau spricht mit einer etwas älteren Frau.', detail: 'Welche Paarung ist ein verbreiteter Ausgangspunkt?', correct: 'Ich: em · Gegenüber: chị', choices: ['Ich: em · Gegenüber: chị', 'Ich: chị · Gegenüber: em', 'Ich: con · Gegenüber: ba'] }
]
