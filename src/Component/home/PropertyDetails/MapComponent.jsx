import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = ({ address }) => {
  const formatState = (stateName) => {
    if (!stateName) return "";
    const s = stateName.toLowerCase().replace(/\s+/g, "");
    const stateMapping = {
      himachalpradesh: "Himachal Pradesh",
      uttarpradesh: "Uttar Pradesh",
      madhyapradesh: "Madhya Pradesh",
      andhrapradesh: "Andhra Pradesh",
      arunachalpradesh: "Arunachal Pradesh",
      westbengal: "West Bengal",
      tamilnadu: "Tamil Nadu",
      jammukashmir: "Jammu and Kashmir",
    };
    return stateMapping[s] || stateName;
  };

  const cleanState = formatState(address.state);

  // Use area for more specific search
  const fullAddress = address.area 
    ? `${address.area}, ${address.city}, ${cleanState}, ${address.pincode}, India`
    : `${address.city}, ${cleanState}, ${address.pincode}, India`;
    
  const fallbackAddress = `${address.city}, ${cleanState}, India`;
  const cityFallbackAddress = `${address.city}, India`;

  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCoordinates = async (query) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
        );
        const data = await response.json();

        if (isMounted) {
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates([parseFloat(lat), parseFloat(lon)]);
            setLoading(false);
            return true;
          }
        }
        return false;
      } catch (err) {
        console.error("Geocoding error:", err);
        return false;
      }
    };

    const loadMap = async () => {
      setLoading(true);
      // Try full address first
      let success = await fetchCoordinates(fullAddress);
      
      // If full address fails, try fallback (city and state)
      if (!success && isMounted) {
        success = await fetchCoordinates(fallbackAddress);
      }

      // If city and state fails, try city only
      if (!success && isMounted) {
        success = await fetchCoordinates(cityFallbackAddress);
      }
      
      if (!success && isMounted) {
        setError("Location not found on map");
        setLoading(false);
      }
    };

    loadMap();

    return () => {
      isMounted = false;
    };
  }, [fullAddress, fallbackAddress, cityFallbackAddress]);

  if (loading) return <div style={{ height: "320px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>Loading Map...</div>;
  if (error && !coordinates.length) return <div style={{ height: "320px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", color: "red" }}>{error}</div>;

  return (
    <div key={coordinates.join(",")}>
      {coordinates.length > 0 && (
        <MapContainer
          center={coordinates}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "320px", width: "100%", borderRadius: "8px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}>
            <Popup>
              <strong>{address.area || address.city}</strong><br />
              {address.city}, {address.state}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
