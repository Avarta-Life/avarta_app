"use server";

import axios from "axios";

export interface PlaceResult {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  place_id: string;
}

interface Params {
  query: string;
  location: { lat: number; lng: number };
  radius: number;
  apiKey: string;
}

export async function fetchNearbyPlaces({
  query,
  location,
  radius,
  apiKey,
}: Params): Promise<PlaceResult[]> {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          key: apiKey,
          location: `${location.lat},${location.lng}`,
          radius: radius,
          keyword: query,
        },
      }
    );

    return response.data.results.map((place: any) => ({
      name: place.name,
      address: place.vicinity,
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      place_id: place.place_id,
    }));
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return [];
  }
}
