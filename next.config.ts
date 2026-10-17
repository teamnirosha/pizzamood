import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https: blob:;
    script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https: blob:;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https: https://*.tile.openstreetmap.org https://*.openstreetmap.org;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https: wss: http: ws:;
    frame-src 'self' https:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
`
  .replace(/\s{2,}/g, " ")
  .trim();

// Old URLs that used to be redirect pages (now outside app/[lang]). Both languages keep working.
const legacy: [string, string][] = [
  ["/location", "/locations"],
  ["/menu", "/franchise"],
  ["/story", "/franchise"],
  ["/success-stories", "/franchise"],
  ["/partnership-plans", "/investment"],
  ["/what-we-provide", "/support"],
  ["/why-pizzaloot", "/franchise"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacy.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `/en${from}`, destination: `/en${to}`, permanent: true },
    ]);
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
