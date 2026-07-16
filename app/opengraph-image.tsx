import { ImageResponse } from 'next/og'
import { portfolio } from '@/data/portfolio'

export const runtime = 'edge'
export const alt = 'Aakshat Agarwal — Data Analyst, AI/ML and Python Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Dynamically generated social/OG card — no external asset required. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0A0F1C 0%, #0F172A 55%, #10233A 100%)',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 76,
              height: 76,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
              color: '#fff',
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            {portfolio.person.initials}
          </div>
          <div style={{ display: 'flex', color: '#A1A1AA', fontSize: 26 }}>
            {portfolio.person.location}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', color: '#f5f5f7', fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
            {portfolio.person.name}
          </div>
          <div style={{ display: 'flex', marginTop: 16, color: '#7DD3FC', fontSize: 34, fontWeight: 500 }}>
            Data Analyst · AI/ML Enthusiast · Python Developer
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {['Python', 'SQL', 'Machine Learning', 'Power BI', 'Flask'].map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#e4e4e7',
                fontSize: 24,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
