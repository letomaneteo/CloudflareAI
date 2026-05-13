export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic"
    })
  ],
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});
