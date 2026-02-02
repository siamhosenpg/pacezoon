import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 🔥 TypeScript error ignore
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com", "i.pinimg.com"],
  },
};

export default nextConfig;
