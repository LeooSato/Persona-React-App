// chamada pra api do p5r
// tem que usar o proxy do corsproxy senao a api do render bloqueia
export async function buscarP5R() {
  const apiUrl = 'https://mpppersona5-api.onrender.com/personas/'
  const url = 'https://corsproxy.io/?' + encodeURIComponent(apiUrl)
  const res = await fetch(url)
  const dados = await res.json()
  console.log('personas p5r carregadas:', dados.length)
  return dados
}
