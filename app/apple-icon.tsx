import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '24%', // Squircle shape
          fontWeight: 'bold',
          border: '6px solid rgba(255, 255, 255, 0.25)',
          fontFamily: 'sans-serif',
          textShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        S
      </div>
    ),
    {
      ...size,
    }
  );
}
