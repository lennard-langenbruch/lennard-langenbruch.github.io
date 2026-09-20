import dynamic from "next/dynamic"; // Import dynamic from Next.js
// Dynamically import leaflet components (client-only)
const ExportedRenderedMap = dynamic(() => import("../components/RenderedMap"), {
  ssr: false,
  suspense: false,
});

export default ExportedRenderedMap;