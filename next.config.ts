import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Silence the workspace root warning by pointing to the project root
    root: __dirname,
  },
};

export default nextConfig;
