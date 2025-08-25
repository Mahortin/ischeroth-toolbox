// src/services/productService.js
export async function fetchProducts() {
    const res = await fetch('http://localhost:8080/api/products')
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
    return await res.json()
  }