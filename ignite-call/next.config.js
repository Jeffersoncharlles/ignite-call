/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: [
    'page.tsx',
    'api.ts',
    'api.tsx'
  ],//extensão de arquivos usada para criar rotas assim da para usar o styles.ts
}

module.exports = nextConfig
