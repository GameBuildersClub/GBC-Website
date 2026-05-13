import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-wrap">
      <div className="not-found-inner">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page not found.</h1>
        <p className="not-found-body">That page doesn&apos;t exist — it may have moved or never existed.</p>
        <Link href="/" className="btn btn-lg">Back to home</Link>
      </div>
    </div>
  );
}
