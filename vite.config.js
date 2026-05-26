import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// proxy de dev pra simular a serverless function /api/proxy que roda na vercel
// (em prod a vercel intercepta /api/proxy direto)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/proxy': {
        target: 'https://example.com',
        changeOrigin: true,
        router(req) {
          const qs = req.url.split('?')[1] || ''
          const alvo = new URLSearchParams(qs).get('url')
          if (!alvo) return null
          return new URL(alvo).origin
        },
        rewrite(path) {
          const idx = path.indexOf('?')
          if (idx === -1) return path
          const alvo = new URLSearchParams(path.slice(idx + 1)).get('url')
          if (!alvo) return path
          const u = new URL(alvo)
          return u.pathname + (u.search || '')
        },
      },
    },
  },
})
