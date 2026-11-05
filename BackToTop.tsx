"use client";
export default function BackToTop({ label }: { label: string }) {
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="u-link">
      {label} ↑
    </button>
  );
}
