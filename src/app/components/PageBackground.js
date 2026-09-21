// Fixierter Hintergrund: Indigo-Rautenmuster, das zur Seitenmitte hin ausblendet
const tile = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
    <path d="M28 0 L56 28 L28 56 L0 28 Z" fill="none" stroke="#6366f1" stroke-opacity="0.35" stroke-width="1.5"/>
    <path d="M28 14 L42 28 L28 42 L14 28 Z" fill="#6366f1" fill-opacity="0.12"/>
  </svg>`
);

const edgeMask =
  "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.55) 12%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 88%, #000 100%)";

export default function PageBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background:
          "radial-gradient(1200px 500px at 50% -10%, rgba(99,102,241,0.10), transparent 70%), #f4f6fb"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,${tile}")`,
          backgroundSize: "56px 56px",
          WebkitMaskImage: edgeMask,
          maskImage: edgeMask
        }}
      />
    </div>
  );
}
