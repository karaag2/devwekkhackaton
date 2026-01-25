import createNextIntlPlugin from 'next-intl/plugin';
// Force reload to pick up Prisma schema changes
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
