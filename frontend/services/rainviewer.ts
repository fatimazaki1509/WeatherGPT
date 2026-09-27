export async function getRainViewerFrames() {
  const res = await fetch(
    "https://api.rainviewer.com/public/weather-maps.json"
  );

  const data = await res.json();

  return {
    host: data.host,
    frames: data.radar.past,
  };
}