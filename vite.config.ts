import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// A lower-case drive letter in the shell's cwd (c:\ vs C:\) makes Windows tooling load
// two copies of React. Normalise it before Vite resolves anything.
if (process.platform === 'win32' && /^[a-z]:/.test(process.cwd())) {
  process.chdir(process.cwd()[0].toUpperCase() + process.cwd().slice(1))
}

// GitHub Pages project site lives under /<repo>/. Override with VITE_BASE_PATH
// (e.g. "/" when the site moves to the customer's own domain).
const base = process.env.VITE_BASE_PATH || '/tojoko-demo/'

export default defineConfig({
  root: process.cwd(),
  plugins: [react(), tailwindcss()],
  base,
  build: {
    target: 'es2022',
  },
})
