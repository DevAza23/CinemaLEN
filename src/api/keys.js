const KEY_MISTRAL  = 'cinemalens_mistral_key'
const KEY_ELEVEN   = 'cinemalens_eleven_key'

export function loadKeys() {
  return {
    mistralKey: localStorage.getItem(KEY_MISTRAL) || '',
    elevenKey:  localStorage.getItem(KEY_ELEVEN)  || '',
  }
}

export function saveKeys({ mistralKey, elevenKey }) {
  if (mistralKey) localStorage.setItem(KEY_MISTRAL, mistralKey)
  else localStorage.removeItem(KEY_MISTRAL)
  if (elevenKey) localStorage.setItem(KEY_ELEVEN, elevenKey)
  else localStorage.removeItem(KEY_ELEVEN)
}

export function hasRequiredKeys() {
  return !!localStorage.getItem(KEY_MISTRAL)
}
