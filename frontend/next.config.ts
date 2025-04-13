import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,//'TRUE' SOLO PARA TESTEO
  },
  typescript: {
    ignoreBuildErrors: true,//'TRUE' SOLO PARA TESTEO
  },
  images: {
    unoptimized: true,//Siempre TRUE
  }
};

export default nextConfig;