import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: "/reactproject666",
    plugins: [plugin(),tailwindcss()],
    server: {
        port: 53321,
    }
})

