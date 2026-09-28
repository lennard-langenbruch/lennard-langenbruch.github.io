/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Static export: the site is served by GitHub Pages, there is no Node process at runtime.
    output: "export",
    trailingSlash: true,
    // GitHub Pages cannot run the Next.js image optimiser.
    images: { unoptimized: true },
};

export default nextConfig;
