const BASE = 'https://api.elevenlabs.io/v1'

const VOICES = {
  Alex: '21m00Tcm4TlvDq8ikWAM',
  Maya: 'EXAVITQu4vr4xnSDxMaL',
}

/**
 * Generate a single TTS audio blob for one line.
 */
async function speak(text, voiceId, apiKey) {
  const res = await fetch(`${BASE}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  })
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${res.statusText}`)
  return res.arrayBuffer()
}

/**
 * Generate full podcast audio from a dialogue array.
 * Returns an object URL that can be used with <audio>.
 */
export async function generatePodcast(dialogue, apiKey) {
  const chunks = []
  for (const { speaker, line } of dialogue) {
    const voiceId = VOICES[speaker] || VOICES.Alex
    const buf = await speak(line, voiceId, apiKey)
    chunks.push(buf)
  }

  // Concatenate all audio buffers into a single blob
  const blob = new Blob(chunks, { type: 'audio/mpeg' })
  return URL.createObjectURL(blob)
}
