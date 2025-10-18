import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// sostituisci "tuo-username" e "nome-repo" con i tuoi dati
export default defineConfig({
  plugins: [react()],
  base: '/tolkien-books-app/', 
})
