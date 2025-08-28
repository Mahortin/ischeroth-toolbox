  // src/services/attributeService.js
export async function fetchAttributes() {
  // keep this if you use a Vite proxy. Otherwise use 'http://localhost:8080/api/attributes'
  const url = '/api/attributes'; 
  // const url = 'http://localhost:8080/api/attributes';
  try {
    const res = await fetch(url, {
      // If you are NOT using cookies/auth, keep credentials: 'omit'
      // If you ARE using cookies, set 'include' and make sure backend allows credentials for your exact Origin.
      credentials: 'omit',
      headers: { 'Accept': 'application/json' },
    });

    // Show non-2xx details
    if (!res.ok) {
      const text = await res.text().catch(() => '<no body>');
      throw new Error(`HTTP ${res.status} ${res.statusText} @ ${url}\n${text}`);
    }

    return await res.json();
  } catch (err) {
    console.error('fetchAttributes failed:', err);
    throw err; // rethrow so your component can show a nice message
  }
}
