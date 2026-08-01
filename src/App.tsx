import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { categories, starterCards } from './data'
import { speak, vietnameseVoice, vietnameseVoices } from './audio'
import { createPersonalCard, loadState, resetState, saveState } from './storage'
import type { Card, Page, StoredState } from './types'

const DAY = 86_400_000
const toneRegex = /[áắấéếíóốớúứýàằầèềìòồờùừỳảẳẩẻểỉỏổởủửỷãẵẫẽễĩõỗỡũữỹạặậẹệịọộợụựỵ]/i

function dayLabel() {
  return new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
}

function markTones(text: string) {
  return text.split(' ').map((word, index) => <span className={toneRegex.test(word) ? 'tone-word' : ''} key={`${word}-${index}`}>{word}{index < text.split(' ').length - 1 ? ' ' : ''}</span>)
}

function useRecording() {
  const [recording, setRecording] = useState(false)
  const [clip, setClip] = useState<string | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  async function toggle() {
    if (recording) { recorder.current?.stop(); return }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error('unsupported')
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const instance = new MediaRecorder(stream)
    chunks.current = []
    instance.ondataavailable = (event) => chunks.current.push(event.data)
    instance.onstop = () => {
      const blob = new Blob(chunks.current, { type: instance.mimeType || 'audio/webm' })
      setClip(URL.createObjectURL(blob))
      stream.getTracks().forEach((track) => track.stop())
      setRecording(false)
    }
    recorder.current = instance
    instance.start()
    setRecording(true)
  }
  return { recording, clip, toggle, clear: () => setClip(null) }
}

function CardView({ card, onRate, compact = false, voiceId }: { card: Card; onRate?: (rating: number) => void; compact?: boolean; voiceId?: string }) {
  const [slow, setSlow] = useState(false)
  const [voiceNotice, setVoiceNotice] = useState(false)
  const [recordError, setRecordError] = useState('')
  const { recording, clip, toggle, clear } = useRecording()

  const play = (isSlow = false, word?: string) => {
    setSlow(isSlow)
    setVoiceNotice(!speak(word ?? card.vietnamese, isSlow, voiceId))
  }
  const record = async () => {
    try { setRecordError(''); await toggle() }
    catch { setRecordError('Aufnahme ist hier nicht verfügbar. Erlaube das Mikrofon oder nutze einen aktuellen Browser.') }
  }

  return <article className={`learning-card ${compact ? 'compact-card' : ''}`}>
    <div className="card-topline"><span className="pill">{card.category}</span><span className="syllables">{card.syllables}</span></div>
    <h2 className="vietnamese">{markTones(card.vietnamese)}</h2>
    <p className="phonetic">≈ {card.phonetic}</p>
    <div className="translations"><strong>{card.german}</strong><span>{card.english}</span></div>
    <p className="context">{card.note}</p>
    <div className="listen-row">
      <button className="sound-button" onClick={() => play(false)} aria-label="Vietnamesischen Satz abspielen">▶ <span>Hören</span></button>
      <button className={`slow-button ${slow ? 'active' : ''}`} onClick={() => play(true)}>½× langsam</button>
      {card.vietnamese.includes(' ') && <button className="word-button" onClick={() => play(true, card.vietnamese.split(' ')[0])}>1. Silbe</button>}
    </div>
    {voiceNotice && <p className="notice">Dein Gerät meldet keine vietnamesische Stimme. Es wird eine Ersatzstimme verwendet; für bestes Hören installiere eine vietnamesische Systemstimme.</p>}
    {!compact && <div className="speak-back">
      <div><span className="eyebrow">DEIN VERSUCH</span><p>{recording ? 'Sprich in Ruhe – tippe auf Stopp, wenn du fertig bist.' : 'Höre zu, sprich nach und hör dich selbst an.'}</p></div>
      <button className={`record-button ${recording ? 'recording' : ''}`} onClick={record}>{recording ? '■ Stopp' : '● Aufnehmen'}</button>
    </div>}
    {recordError && <p className="notice">{recordError}</p>}
    {clip && <div className="clip"><audio controls src={clip} /><button onClick={clear}>Aufnahme löschen</button></div>}
    {onRate && <div className="rating"><span>Wie sicher warst du?</span><div><button onClick={() => onRate(0)}>Noch üben</button><button onClick={() => onRate(1)}>Fast</button><button className="success" onClick={() => onRate(2)}>Konnte ich</button></div></div>}
  </article>
}

function Tones({ voiceId }: { voiceId?: string }) {
  const rows = [
    ['ngang', 'ma', 'keine Markierung', 'eben und ruhig'],
    ['sắc', 'má', '´', 'klar nach oben'],
    ['huyền', 'mà', '`', 'sanft nach unten'],
    ['hỏi', 'mả', 'ˀ', 'kurz fallend und wieder anhebend'],
    ['ngã', 'mã', '~', 'im Süden oft nahe bei hỏi'],
    ['nặng', 'mạ', '.', 'kurz, tief und mit Stopp']
  ]
  return <section className="page tones-page"><header className="page-heading"><span className="eyebrow">GRUNDLAGE</span><h1>Töne machen Bedeutung.</h1><p>Die Buchstaben bleiben ähnlich, der Ton verändert das Wort. Höre erst den Verlauf – Perfektion kommt später.</p></header><div className="tone-callout"><span>✦</span><p><strong>Südlicher Fokus:</strong> Im Alltag Südvietnams klingen <em>hỏi</em> und <em>ngã</em> häufig sehr ähnlich. Du lernst beide Schreibweisen, übst aber keinen künstlichen Unterschied.</p></div><div className="tone-list">{rows.map(([name, example, sign, description]) => <div className="tone-row" key={name}><button onClick={() => speak(example, true, voiceId)} aria-label={`${example} hören`}>▶</button><div><strong>{name}</strong><span>{description}</span></div><b>{example}</b><i>{sign}</i></div>)}</div><div className="tip-card"><h2>So übst du ohne Stress</h2><ol><li>Tippe auf ▶ und höre nur zu.</li><li>Sprich die Silbe im gleichen Rhythmus nach.</li><li>Nimm dich erst dann auf – nicht jeder Versuch muss gut sein.</li></ol></div></section>
}

function Personal({ state, update }: { state: StoredState; update: (next: StoredState) => void }) {
  const [showForm, setShowForm] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const vietnamese = String(values.get('vietnamese') || '').trim()
    const german = String(values.get('german') || '').trim()
    if (!vietnamese || !german) return
    const card = createPersonalCard({ vietnamese, german, english: String(values.get('english') || '').trim() || german, phonetic: String(values.get('phonetic') || '').trim() || 'eigene Lautnotiz', syllables: vietnamese.split(' ').join(' · '), note: String(values.get('note') || '').trim() || 'Persönliche Familienkarte.' })
    update({ ...state, personalCards: [card, ...state.personalCards] })
    event.currentTarget.reset(); setShowForm(false)
  }
  return <section className="page personal-page"><header className="page-heading"><span className="eyebrow">EIGENE KARTEN</span><h1>Wörter, die für dich wichtig sind.</h1><p>Halte Formulierungen, Namen und Dinge aus deinem Alltag fest. Alles bleibt auf diesem Gerät.</p></header><button className="primary full" onClick={() => setShowForm(!showForm)}>{showForm ? 'Formular schließen' : '+ Persönliche Karte hinzufügen'}</button>{showForm && <form className="personal-form" onSubmit={submit}><label>Vietnamesisch*<input name="vietnamese" placeholder="z. B. ăn cơm" required /></label><label>Deutsch*<input name="german" placeholder="z. B. essen" required /></label><label>Englisch<input name="english" placeholder="z. B. eat" /></label><label>Deine Lautnotiz<input name="phonetic" placeholder="z. B. an kəm" /></label><label>Wann sagt man das?<textarea name="note" placeholder="z. B. beim Abendessen" rows={2} /></label><button className="primary" type="submit">Karte speichern</button></form>}<div className="personal-list">{state.personalCards.length ? state.personalCards.map(card => <CardView card={card} compact key={card.id} voiceId={state.voiceId} />) : <div className="empty"><span>♡</span><h2>Noch ganz leer.</h2><p>Notiere ein Wort aus einem Gespräch oder einer Serie – und erstelle deine erste Karte.</p></div>}</div></section>
}

function VoicePicker({ voices, selectedId, onChange }: { voices: SpeechSynthesisVoice[]; selectedId?: string; onChange: (voiceId: string) => void }) {
  return <div className="voice-picker">
    <label htmlFor="voice-choice">Vietnamesische Stimme</label>
    {voices.length ? <select id="voice-choice" value={selectedId ?? vietnameseVoice()?.voiceURI ?? ''} onChange={(event) => onChange(event.target.value)}>{voices.map((voice) => <option value={voice.voiceURI} key={voice.voiceURI}>{voice.name} · {voice.lang}</option>)}</select> : <p>Keine vietnamesische Systemstimme gefunden. Installiere eine Stimme in den Geräteeinstellungen.</p>}
    <small>Die ausgewählte Stimme wird für jede Karte beibehalten.</small>
  </div>
}

export default function App() {
  const [state, setState] = useState<StoredState>(loadState)
  const [page, setPage] = useState<Page>('home')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [roundIndex, setRoundIndex] = useState(0)
  const [sessionCards, setSessionCards] = useState<Card[]>([])
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(vietnameseVoices)
  const [showVoicePicker, setShowVoicePicker] = useState(false)
  const voiceReady = voices.length > 0
  const selectedVoice = vietnameseVoice(state.voiceId)
  const allCards = useMemo(() => [...starterCards, ...state.personalCards], [state.personalCards])

  useEffect(() => { saveState(state) }, [state])
  useEffect(() => { const refresh = () => setVoices(vietnameseVoices()); speechSynthesis?.addEventListener('voiceschanged', refresh); return () => speechSynthesis?.removeEventListener('voiceschanged', refresh) }, [])

  const dueCards = useMemo(() => {
    const now = Date.now()
    const due = allCards.filter(card => !state.progress[card.id] || state.progress[card.id].due <= now)
    const byDue = (a: Card, b: Card) => (state.progress[a.id]?.due ?? 0) - (state.progress[b.id]?.due ?? 0)
    const personalDue = due.filter(card => card.isPersonal).sort(byDue)
    const standardDue = due.filter(card => !card.isPersonal).sort(byDue)
    return [...personalDue, ...standardDue].slice(0, state.goal)
  }, [allCards, state.progress, state.goal])
  const freshRound = dueCards.length ? dueCards : allCards.slice(0, Math.min(state.goal, allCards.length))
  const round = sessionCards.length ? sessionCards : freshRound
  const activeCard = round[Math.min(roundIndex, round.length - 1)]
  const learned = Object.values(state.progress).filter(item => item.seen > 0).length

  function update(next: StoredState) { setState(next) }
  function rate(rating: number) {
    if (!activeCard) return
    const previous = state.progress[activeCard.id] ?? { interval: 0, due: 0, seen: 0 }
    const interval = rating === 0 ? 0 : rating === 1 ? Math.max(1, previous.interval || 1) : Math.min(21, Math.max(2, previous.interval * 2 || 2))
    update({ ...state, progress: { ...state.progress, [activeCard.id]: { interval, due: Date.now() + (rating === 0 ? 0 : interval * DAY), seen: previous.seen + 1 } } })
    setRoundIndex(index => index + 1)
  }
  function openRound() { setSessionCards(freshRound); setRoundIndex(0); setPage('learn') }
  const topics = categories.map(category => ({ category, cards: allCards.filter(card => card.category === category) }))

  return <main className="app-shell"><nav className="topbar"><button className="brand" onClick={() => setPage('home')}><span>chào</span><b>nhà</b></button><button className="voice-status voice-control" onClick={() => setShowVoicePicker(open => !open)} aria-expanded={showVoicePicker}><span className={voiceReady ? 'dot ready' : 'dot'}></span>{voiceReady ? selectedVoice?.name ?? 'Stimme wählen' : 'Stimme einrichten'}</button></nav>
    {showVoicePicker && <VoicePicker voices={voices} selectedId={state.voiceId} onChange={(voiceId) => update({ ...state, voiceId })} />}
    {page === 'home' && <section className="page home-page"><div className="hero"><span className="eyebrow">{dayLabel().toUpperCase()}</span><h1>Chào! <em>Vietnamesisch für den Alltag,</em> Schritt für Schritt.</h1><p>Hören, nachsprechen, wiederholen. Kein Druck – nur ein paar Minuten heute.</p><button className="primary hero-button" onClick={openRound}>Meine Tagesrunde <span>→</span></button><div className="hero-shape shape-one"></div><div className="hero-shape shape-two"></div></div><div className="stat-row"><div><strong>{Math.min(round.length, state.goal)}</strong><span>heute bereit</span></div><div><strong>{learned}</strong><span>Wörter berührt</span></div><div><strong>5–10</strong><span>Minuten reichen</span></div></div><section className="home-section"><div className="section-label"><span>WEITERÜBEN</span><button onClick={() => setPage('topics')}>Alle Themen →</button></div><div className="topic-grid">{topics.slice(0, 4).map(({ category, cards }, index) => <button className={`topic topic-${index}`} key={category} onClick={() => { setSelectedCategory(category); setPage('topics') }}><span>{['☀', '♡', '⌂', '◌'][index]}</span><strong>{category}</strong><small>{cards.length} Karten</small></button>)}</div></section><section className="mini-tone"><div><span className="eyebrow">KLEINE ERINNERUNG</span><h2>Du musst nicht „perfekt“ klingen.</h2><p>Ein verständliches Wort, ein Lächeln und Nachfragen bringen dich weiter.</p></div><button onClick={() => setPage('tones')}>Töne üben →</button></section></section>}
    {page === 'learn' && <section className="page learn-page"><header className="learn-header"><button className="back" onClick={() => setPage('home')}>← Heute</button><span>{Math.min(roundIndex + 1, round.length)} / {round.length}</span></header>{activeCard && roundIndex < round.length ? <><div className="round-progress"><i style={{ width: `${((roundIndex) / round.length) * 100}%` }}></i></div><p className="round-title">DEINE TAGESRUNDE</p><CardView card={activeCard} onRate={rate} voiceId={state.voiceId} /></> : <div className="finish"><span>✦</span><p className="eyebrow">FÜR HEUTE GESCHAFFT</p><h1>Sehr gut. Nimm das Wort mit in den Alltag.</h1><p>Ein Satz in einer echten Situation ist mehr wert als zehn perfekte Wiederholungen.</p><button className="primary" onClick={() => setPage('home')}>Zurück zu Heute</button></div>}</section>}
    {page === 'topics' && <section className="page topics-page"><header className="page-heading"><span className="eyebrow">DEIN WORTSCHATZ</span><h1>Was passt gerade zu deinem Tag?</h1><p>Wähle ein Thema und höre einzelne Karten so oft du möchtest.</p></header><div className="filters"><button className={!selectedCategory ? 'selected' : ''} onClick={() => setSelectedCategory(null)}>Alle</button>{topics.map(({ category }) => <button className={selectedCategory === category ? 'selected' : ''} key={category} onClick={() => setSelectedCategory(category)}>{category}</button>)}</div><div className="cards-grid">{allCards.filter(card => !selectedCategory || card.category === selectedCategory).map(card => <CardView card={card} compact key={card.id} voiceId={state.voiceId} />)}</div></section>}
    {page === 'tones' && <Tones voiceId={state.voiceId} />}
    {page === 'personal' && <Personal state={state} update={update} />}
    <nav className="bottom-nav"><button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}><span>⌂</span>Heute</button><button className={page === 'topics' || page === 'learn' ? 'active' : ''} onClick={() => setPage('topics')}><span>▤</span>Wörter</button><button className={page === 'tones' ? 'active' : ''} onClick={() => setPage('tones')}><span>〰</span>Töne</button><button className={page === 'personal' ? 'active' : ''} onClick={() => setPage('personal')}><span>♡</span>Eigene</button></nav>
    <footer><button onClick={() => { if (confirm('Deinen lokalen Fortschritt und persönliche Karten wirklich löschen?')) { resetState(); setState(loadState()); setPage('home') } }}>Lokale Lerndaten zurücksetzen</button></footer>
  </main>
}
