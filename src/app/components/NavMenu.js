import Link from "next/link";
import { accent } from "../accent";

// Hauptmenü im Kopfbereich; `active` = "live" | "history"
export default function NavMenu({ active }) {
  const linkStyle = (key) => ({ color: active === key ? accent.navActive : "white" });

  return (
    <nav style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 18.7, fontWeight: 700 }}>
      <Link href="/live" style={linkStyle("live")}>Live Dashboard</Link>
      <span aria-hidden="true" style={{ opacity: 0.5 }}>|</span>
      <Link href="/" style={linkStyle("history")}>Weatherdata History</Link>
    </nav>
  );
}
