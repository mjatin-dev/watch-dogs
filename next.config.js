/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    YOUR_SUPABASE_URL: process.env.YOUR_SUPABASE_URL,
    YOUR_SUPABASE_ANON_KEY: process.env.YOUR_SUPABASE_ANON_KEY,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  },
};

module.exports = nextConfig
