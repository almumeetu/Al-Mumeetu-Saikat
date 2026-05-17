import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Al Mumeetu Saikat Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #020617, #0f172a, #1e293b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '80px',
            borderRadius: '40px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              margin: 0,
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Al Mumeetu Saikat
          </h1>
          <p
            style={{
              fontSize: 32,
              fontWeight: 500,
              marginTop: 20,
              color: '#cbd5e1',
            }}
          >
            Full-Stack Next.js Developer
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
