export default function TourSheratonPage() {
  const url = process.env.TOUR_SHERATON_URL;

  if (!url) return null;

  return (
    <iframe
      src={url}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', border: 'none' }}
      allow="fullscreen; gyroscope; accelerometer"
      title="Tour Virtual 360° Sheraton"
    />
  );
}
