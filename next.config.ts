import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "gsap", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
