"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 1. New Helper: Zooms to specific points when "activeDay" changes
function MapController({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points && points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [points, map]);
  return null;
}

export default function TripMap({ routeInfo, itinerary, activeDay }) {
  const [routePath, setRoutePath] = useState([]);
  
  // 2. Calculate the "Focus Points" for the Active Day
  const activeActivities = itinerary[activeDay - 1]?.activities || [];
  const focusPoints = activeActivities.map(a => a.coordinates).filter(p => p);

  // Fallback: If no day selected, show whole route
  const allPoints = itinerary.flatMap(d => d.activities.map(a => a.coordinates)).filter(p => p);
  const pointsToShow = focusPoints.length > 0 ? focusPoints : allPoints;

  // Fetch Route (OSRM) logic - (Kept same as before, simplified for brevity)
  // ... (Your OSRM fetch code goes here) ...

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-none z-0 relative">
      <MapContainer center={[6.9271, 79.8612]} zoom={8} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* The Controller makes it fly! */}
        <MapController points={pointsToShow} />

        {/* Markers for the ACTIVE DAY only (Cleaner look) */}
        {activeActivities.map((act, idx) => (
           act.coordinates && (
             <Marker key={idx} position={act.coordinates} icon={icon}>
               <Popup><b>{act.title}</b><br/>{act.time}</Popup>
             </Marker>
           )
        ))}
      </MapContainer>
    </div>
  );
}