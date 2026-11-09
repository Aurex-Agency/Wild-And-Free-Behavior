import type { NextConfig } from "next";

// The browser talks to two third parties: the intake webhook (if enabled) and Google Analytics.
const intakeOrigin = (() => {
  try {
    return process.env.NEXT_PUBLIC_INTAKE_WEBHOOK_URL ? new URL(process.env.NEXT_PUBLIC_INTAKE_WEBHOOK_URL).origin : "";
  } catch {
    return "";
  }
})();

const csp = [
  "default-src 'self'",
  // Next.js inlines small bootstrap scripts in statically generated pages.
  // The Google origins here and below are Google's documented list for GA4 and nothing wider,
  // so an ad pixel added inside Tag Manager is blocked until someone changes this policy.
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com${intakeOrigin ? ` ${intakeOrigin}` : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // URLs from the practice's earlier website, so old links and bookmarks still land somewhere useful.
  async redirects() {
    return [
      { source: "/abouta4ae63fc", destination: "/about", statusCode: 301 },
      { source: "/about-us", destination: "/about", statusCode: 301 },
      { source: "/contact", destination: "/visit", statusCode: 301 },
      { source: "/contact-us", destination: "/visit", statusCode: 301 },
      { source: "/home", destination: "/", statusCode: 301 },
    ];
  },
  async headers() {
    // Dev needs eval and websockets for fast refresh, so the policy applies to production builds only.
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
