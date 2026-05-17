import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '25%', // beautiful rounded-squircle shape
          fontWeight: 'bold',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          fontFamily: 'sans-serif',
        }}
      >
        S
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
