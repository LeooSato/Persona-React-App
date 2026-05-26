// proxy serverless rodando na vercel pra contornar o cors da api do render
// chama /api/proxy?url=<url da api> e a vercel busca pra gente
export default async function handler(req, res) {
  const url = req.query.url
  if (!url) {
    return res.status(400).json({ erro: 'falta o parametro url' })
  }
  try {
    const r = await fetch(url)
    const texto = await r.text()
    // cache 1h na borda pra nao ficar batendo toda hora no render
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', r.headers.get('content-type') || 'application/json')
    res.status(r.status).send(texto)
  } catch (e) {
    res.status(500).json({ erro: 'erro ao buscar', detalhes: String(e) })
  }
}
