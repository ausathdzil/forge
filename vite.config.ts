import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite-plus'

const config = defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    singleQuote: true,
    semi: false,
    sortImports: true,
    ignorePatterns: ['drizzle', 'src/components/ui/**'],
    sortTailwindcss: {
      stylesheet: 'src/styles.css',
      functions: ['clsx', 'cn', 'cva'],
    },
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ['drizzle', 'src/components/ui/**'],
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
