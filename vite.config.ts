import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repo = 'estimates'
const base = `/${repo}/`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // inject <base href> เพื่อให้ path ถูกต้องบน GitHub Pages (รวมกรณีไม่มี trailing slash)
    {
      name: 'html-base',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>\n    <base href="${base}">`
        )
      },
    },
  ],
  base,
})
