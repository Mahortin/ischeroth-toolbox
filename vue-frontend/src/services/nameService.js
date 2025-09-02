export async function fetchNames() {
  const url = '/api/names'
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
    console.error('fetchNames failed:', err)
    throw err
  }
}
