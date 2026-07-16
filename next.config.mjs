/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // three.js ships modern ESM; transpiling keeps older bundlers happy.
  transpilePackages: ['three'],
  // TypeScript (strict) is the correctness gate; don't fail prod builds on
  // lint style nits. Run `npm run lint` locally to see them.
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
