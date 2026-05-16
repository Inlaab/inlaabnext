import TourViewer from "../TourViewer";

export default function TourSheratonPage() {
  const url = process.env.TOUR_SHERATON_URL;
  if (!url) return null;
  return <TourViewer url={url} title="Tour Sheraton" />;
}
