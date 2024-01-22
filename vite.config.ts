import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// Serve para consultar as configurações do tsconfig.json
export default defineConfig({
    plugins: [tsconfigPaths()],
})
