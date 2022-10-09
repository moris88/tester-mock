const { log } = console
require('esbuild')
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outfile: './build/index.js',
    platform: 'node',
    minify: true,
  })
  .then((result) => {
    log(result)
    process.exit(0)
  })
  .catch((error) => {
    log(error)
    process.exit(1)
  })
