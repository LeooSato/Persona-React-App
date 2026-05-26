// chamada pra api do p5r
// usa o proxy allorigins pra contornar o cors (o corsproxy.io so funciona em localhost)
export async function buscarP5R() {
  const apiUrl = 'https://mpppersona5-api.onrender.com/personas/'
  const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(apiUrl)
  const res = await fetch(url)
  const dados = await res.json()
  console.log('personas p5r carregadas:', dados.length)
  return dados
}
