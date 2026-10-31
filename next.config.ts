import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicit caching: nothing is cached unless marked with "use cache".
  // Anything dynamic (cookies, live availability) must render inside <Suspense>.
  cacheComponents: true,
  // Automatic memoization; no hand-written useMemo/useCallback needed.
  reactCompiler: true,
  // Self-contained server in .next/standalone for the Docker image (see Dockerfile).
  output: "standalone",
};

export default nextConfig;
