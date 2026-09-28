export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://lennard-langenbruch.github.io/sitemap.xml"
  };
}
