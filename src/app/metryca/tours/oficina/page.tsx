import Link from "next/link";

export default function TourOficinaPage() {
  const url = process.env.TOUR_OFICINA_URL;

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#003049" }}>
        <p className="text-white/50">Tour no configurado.</p>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen" style={{ background: "#003049" }}>
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3 border-b border-white/10"
        style={{ background: "rgba(0,48,73,0.85)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/metryca/tours" className="text-white/40 hover:text-[#fbbe49] transition-colors text-sm">
            ← Tours
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-white/60 text-sm tracking-widest uppercase">Tour Oficina</span>
        </div>
        <span className="text-[#fbbe49]/60 text-xs tracking-[0.3em] uppercase">360°</span>
      </div>

      <iframe
        src={url}
        className="w-full h-full border-0"
        style={{ paddingTop: "52px" }}
        allow="fullscreen; gyroscope; accelerometer"
        title="Tour Virtual 360° Oficina"
      />
    </div>
  );
}
