/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  httpAgentOptions: {
    keepAlive: false,
  },
};

export default nextConfig;
