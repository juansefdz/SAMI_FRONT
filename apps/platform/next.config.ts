import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Monorepo: el trazado de dependencias parte de la raíz de SAMI_FRONT.
  outputFileTracingRoot: path.join(__dirname, "../../"),
  poweredByHeader: false,
  transpilePackages: ["@sami/shared"],
};

export default nextConfig;
