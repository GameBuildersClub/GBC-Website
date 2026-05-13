import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f5f5f3", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: "#c0392b", lineHeight: 1 }}>404</div>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: "16px 0 8px" }}>Page not found.</h1>
          <p style={{ color: "#666", marginBottom: 32 }}>That page doesn&apos;t exist — it may have moved or never existed.</p>
          <Link href="/" style={{ background: "#c0392b", color: "#fff", padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>Back to home</Link>
        </div>
      </body>
    </html>
  );
}
