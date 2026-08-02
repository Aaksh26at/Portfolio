import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aakshat Agarwal — Portfolio',
    short_name: 'Aakshat',
    description:
      'Portfolio of Aakshat Agarwal — Data Analyst, AI/ML and Python Developer based in Jaipur, India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F8FF',
    theme_color: '#F7F8FF',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
