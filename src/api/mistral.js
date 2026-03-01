import axios from 'axios'

const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions'

/**
 * Robustly extract JSON from LLM text that may contain markdown fences,
 * trailing commas, or surrounding prose.
 */
function extractJson(raw) {
  let t = raw.replace(/^```(?:json)?\s*/im, '').replace(/\s*```\s*$/im, '').trim()
  const s = t.indexOf('{'), e = t.lastIndexOf('}')
  if (s === -1 || e === -1) throw new Error('No JSON object found in response')
  t = t.slice(s, e + 1)
  try { return JSON.parse(t) } catch (_) { /* repair below */ }
  const repaired = t
    .replace(/,\s*([}\]])/g, '$1')
    .replace(/'([^']*?)'\s*:/g, '"$1":')          // single-quoted keys
    .replace(/:\s*'([^']*?)'/g, ': "$1"')          // single-quoted values
    .replace(/"([^"]*)"/g, (_, inner) =>
      '"' + inner.replace(/\n/g, '\\n').replace(/\r/g, '').replace(/\t/g, '\\t') + '"')
  try { return JSON.parse(repaired) } catch (err) {
    throw new Error(`Malformed JSON from Mistral: ${err.message}`)
  }
}

/**
 * Research dashboard analysis
 */
export async function researchMovie(movie, apiKey) {
  const prompt = `You are a professional film researcher. Given this movie: "${movie.title}" (${movie.year}), directed by ${movie.director}.
Genre: ${movie.genre}. Actors: ${movie.actors}. Plot: ${movie.plot}.

Return ONLY valid JSON, no markdown, no explanation. Use double quotes for all keys and string values:
{
  "cast": [{ "actor": "name", "role": "character name", "fact": "one surprising casting fact" }],
  "filming_locations": [{ "place": "city/country", "scene": "which scene was filmed here", "detail": "interesting production detail" }],
  "soundtrack": { "composer": "name", "tracks": [{ "name": "track name", "scene": "where it plays" }] },
  "production": { "budget": "$X million", "box_office": "$X million", "cameras": "camera model used", "film_format": "35mm/digital/IMAX etc", "shooting_days": "number" },
  "awards": [{ "award": "Oscar/BAFTA/etc", "category": "category name", "result": "Won/Nominated" }],
  "trivia": ["fact 1", "fact 2", "fact 3", "fact 4", "fact 5"],
  "quotes": [{ "text": "memorable quote", "character": "who said it" }],
  "podcast_script": {
    "dialogue": [
      { "speaker": "Alex", "line": "opening line about the film" },
      { "speaker": "Maya", "line": "response and commentary" },
      { "speaker": "Alex", "line": "interesting observation" },
      { "speaker": "Maya", "line": "additional insight" },
      { "speaker": "Alex", "line": "closing thought" },
      { "speaker": "Maya", "line": "final remark" }
    ]
  }
}

Provide 3-5 cast entries, 3 filming locations, 4-6 soundtrack tracks, 4-6 awards, exactly 5 trivia facts, 3-4 quotes, and 6 podcast dialogue lines.`

  const { data } = await axios.post(
    MISTRAL_URL,
    {
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 4000,
    },
    { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
  )

  return extractJson(data.choices[0].message.content)
}

/**
 * Wiki-style article generation
 */
export async function wikiMovie(movie, apiKey) {
  const prompt = `You are a Wikipedia editor. Write a complete wiki page for the movie: ${movie.title} (${movie.year}).
Return ONLY valid JSON, no markdown:
{
  'overview': '',
  'plot': '',
  'production': {
    'development': '',
    'casting': '',
    'filming': '',
    'music': ''
  },
  'release': {
    'theatrical': '',
    'reception': '',
    'box_office': ''
  },
  'legacy': '',
  'trivia': ['', '', '', ''],
  'cast_table': [{ 'actor': '', 'role': '', 'notes': '' }],
  'crew': [{ 'name': '', 'role': '' }]
}

All non-table text fields must be complete paragraph prose in a Wikipedia tone.`

  const { data } = await axios.post(
    MISTRAL_URL,
    {
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 4500,
    },
    { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
  )

  return extractJson(data.choices[0].message.content)
}

/**
 * Conversational movie Q&A
 */
export async function chatMovieQuestion(movie, history, apiKey) {
  const messages = [
    {
      role: 'system',
      content:
        'You are a concise movie assistant. Answer questions about films, filmmaking, cast, themes, reception, and related cinema context. If the user asks outside movie topics, politely steer back to movie-related help.',
    },
    {
      role: 'system',
      content: `Current movie context:
Title: ${movie.title}
Year: ${movie.year}
Director: ${movie.director}
Genre: ${movie.genre}
Actors: ${movie.actors}
Plot: ${movie.plot}`,
    },
    ...history.map((m) => ({ role: m.role, content: m.content })),
  ]

  const { data } = await axios.post(
    MISTRAL_URL,
    {
      model: 'mistral-large-latest',
      messages,
      temperature: 0.5,
      max_tokens: 900,
    },
    { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
  )

  return data.choices?.[0]?.message?.content?.trim() || 'I could not generate a response.'
}
