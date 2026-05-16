import TourViewer from "../TourViewer";

export default function TourOficinaPage() {
  const url = process.env.TOUR_OFICINA_URL;
  if (!url) return null;
  return <TourViewer url={url} title="Tour Oficina" />;
}
