"use client";

import * as React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { PlaceResult } from "@/lib/places";

export interface IGooogleMapsMarkerWindowProps {
  markers: PlaceResult[];
}

export default function GooogleMapsMarkerWindow(
  props: IGooogleMapsMarkerWindowProps
) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <_GoogleMapsMarkerWindow {...props} />
    </Wrapper>
  );
}

function _GoogleMapsMarkerWindow(props: IGooogleMapsMarkerWindowProps) {
  const mapDivRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const markersRef = React.useRef<google.maps.Marker[]>([]);

  React.useEffect(() => {
    if (mapDivRef.current) {
      const map = new window.google.maps.Map(mapDivRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      mapRef.current = map;
    }
    if (mapRef.current && props.markers.length > 0) {
      const markers = props.markers.map((place) => {
        return new google.maps.Marker({
          position: { lat: place.location.lat, lng: place.location.lng },
          map: mapRef.current,
        });
      });
      const bounds = new google.maps.LatLngBounds();
      props.markers.forEach((place: PlaceResult) => {
        bounds.extend({
          lat: place.location.lat,
          lng: place.location.lng,
        });
      });

      markersRef.current = markers;
      mapRef.current.fitBounds(bounds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full h-80 border-4 border-slate-500 rounded-lg my-2"
      ref={mapDivRef}
      id="map"
    ></div>
  );
}
