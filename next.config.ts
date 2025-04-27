import type { NextConfig } from 'next';

// CORS configuration
const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://192.168.100.3:3000'],
  async headers() {
    return [
      {
        source: '/(.*)', 
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
