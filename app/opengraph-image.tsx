import { ImageResponse } from 'next/og'
import { portfolio } from '@/data/portfolio'

export const runtime = 'edge'
export const alt = 'Aakshat Agarwal — Data Analyst, AI/ML and Python Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Dynamically generated social card aligned to the editorial site system. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          background: '#F7F8FF',
          color: '#1D2433',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 96,
            borderRight: '2px solid #CBD4E8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', color: '#3C5CE8', fontSize: 22, fontWeight: 700 }}>
            {portfolio.person.initials}
          </div>
          <div style={{ display: 'flex', color: '#5E687B', fontSize: 16 }}>2026</div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingLeft: 56,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5E687B', fontSize: 18 }}>
            <span>PORTFOLIO / APPLIED INTELLIGENCE</span>
            <span>{portfolio.person.location}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', color: '#1D2433', fontSize: 72, fontWeight: 700, lineHeight: 1.02 }}>
              {portfolio.person.name}
            </div>
            <div style={{ display: 'flex', marginTop: 18, color: '#3C5CE8', fontSize: 34, fontWeight: 500 }}>
              Data · ML · Python systems
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 28,
              borderTop: '2px solid #CBD4E8',
              paddingTop: 20,
              color: '#5E687B',
              fontSize: 19,
            }}
          >
            {['Machine learning', 'Analytics', 'Backend engineering'].map((item, index) => (
              <div key={item} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: '#3C5CE8' }}>0{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
