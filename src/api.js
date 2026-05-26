// chamada pra api do p5r
// usa nosso proxy serverless em /api/proxy (vercel) pra contornar o cors do render
export async function buscarP5R() {
  const apiUrl = 'https://mpppersona5-api.onrender.com/personas/'
  const url = '/api/proxy?url=' + encodeURIComponent(apiUrl)
  const res = await fetch(url)
  const dados = await res.json()
  console.log('personas p5r carregadas:', dados.length)
  return dados
}
