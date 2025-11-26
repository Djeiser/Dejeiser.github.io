import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno si existen (útil para desarrollo local)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    base: './', // Asegura que funcione en subdirectorios de GitHub Pages
    define: {
      // Esto evita el error "process is not defined" en el navegador
      // Inyecta el valor de la API KEY durante la construcción si está disponible
      'process.env': {
        API_KEY: JSON.stringify(env.API_KEY || process.env.API_KEY || '')
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  };
});