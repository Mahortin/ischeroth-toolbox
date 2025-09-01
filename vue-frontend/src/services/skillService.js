export async function fetchSkills() {
  const url = '/api/skills'
  try {
    const res = await fetch(url, {
      credentials: 'omit',
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '<no body>')
      throw new Error(`HTTP ${res.status} ${res.statusText} @ ${url}\n${text}`)
    }

    return await res.json()
  } catch (err) {
    console.error('fetchSkills failed:', err)
    throw err
  }
}
