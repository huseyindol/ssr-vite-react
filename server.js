import fs from 'node:fs/promises'
import express from 'express'
import { build } from 'esbuild'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Generate a build hash on server start
let buildHash = '';
try {
  // Only load in development mode, in production this will be bundled
  if (!isProduction) {
    await build({
      entryPoints: ['./src/utils/hash.ts'],
      outfile: './src/utils/hash.js',
      format: 'esm',
      platform: 'node'
    });
    const { generateShortBuildHash } = await import('./src/utils/hash.js');
    buildHash = generateShortBuildHash();
  } else {
    // In production, we'll use a simpler approach
    buildHash = Date.now().toString(36).substring(0, 10);
  }
  console.log(`Build hash: ${buildHash}`);
} catch (error) {
  console.error('Failed to generate build hash:', error);
  // Fallback to a simpler hash if something fails
  buildHash = Math.random().toString(36).substring(2, 12);
}

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.tsx').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.tsx')).render
    }

    const rendered = await render(url)
    console.log('rendered -- \n', rendered)

    // Use the buildHash from render function if available, otherwise use our server-generated one
    const finalBuildHash = rendered.buildHash || buildHash;

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace(/<!--app-build-hash-->/g, finalBuildHash)

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} (build: ${buildHash})`)
})