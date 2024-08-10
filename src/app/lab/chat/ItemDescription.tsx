"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TagIcon } from "lucide-react";
import * as React from "react";
import Image from "next/image";
import ServerChatBubble from "@/components/chat-bubble/ServerChatBubble";
import axios, { Axios } from "axios";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { fetchNearbyPlaces, PlaceResult } from "@/lib/places";
import GooogleMapsMarkerWindow from "@/components/maps/GoogleMapMarkerWindow";
import VideoSwiper from "@/components/swiper/VideoSwiper";

export interface IItemDescriptionProps {
  itemsInImage: any;
  selectedItem: any;
  setSelectedItem: any;
  axiosClient: Axios;
  videos: any[];
}

export default function ItemDescription({
  itemsInImage,
  selectedItem,
  setSelectedItem,
  axiosClient,
  videos,
}: IItemDescriptionProps) {
  const [location, _] = useLocalStorage("location", "");
  const [nearbyDumpingLocations, setNearbyDumpingLocations] = React.useState<
    PlaceResult[]
  >([]);
  const [nearbyNGOs, setNearbyNGOs] = React.useState<PlaceResult[]>([]);

  const [isLoading, setIsLoading] = React.useState(false);
  // const [relatedVideos, setRelatedVideos] = React.useState<any[]>([
  //   {
  //     Title: "Some video with very long name that should be truncated",
  //     Description: "Some description",
  //     URL: "https://www.youtube.com/watch?v=abracadabra",
  //     Thumbnail_URL: "https://i.ytimg.com/vi/abracadabra/hqdefault.jpg",
  //   },
  // ]);

  React.useEffect(() => {
    if (location && selectedItem && nearbyDumpingLocations.length === 0) {
      (async () => {
        try {
          setIsLoading(true);
          const res = await fetchNeabyDumpingLocations(location);
          setNearbyDumpingLocations(res);
          console.log("nearbyDumpingLocations", res);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }

    if (location && selectedItem && nearbyNGOs.length === 0) {
      (async () => {
        try {
          setIsLoading(true);
          const res = await fetchNearbyNGOs(location);
          setNearbyNGOs(res);
          console.log("nearbyNGOs", res);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, selectedItem]);

  return (
    <>
      <div>
        {(itemsInImage && Object.values(itemsInImage)).map(
          (item: any, index: number) => (
            <Button
              className={cn(
                selectedItem?.Item && item.Item === selectedItem.Item
                  ? "bg-blue-300 hover:bg-blue-400"
                  : "bg-gray-100 hover:bg-gray-200",
                "px-4 py-2 m-2 text-gray-700  inline-block rounded-3xl cursor-pointer text-nowrap"
              )}
              onClick={() => {
                setSelectedItem(item);
                // setIsRecycling(false);
                // setIsReusing(false);
              }}
              key={index}
            >
              <div className="flex items-center flex-nowrap">
                <TagIcon className="w-5 h-5 mr-2" />
                {item.Item}
              </div>
            </Button>
          )
        )}
      </div>
      {Object.keys(itemsInImage).length !== 0 && (
        <ServerChatBubble>Choose from above detected items.</ServerChatBubble>
      )}
      {selectedItem && (
        <div className="py-2">
          {(() => {
            if (
              (selectedItem.Category as string[]).includes("Recyclable") ||
              (selectedItem.Category as string[]).includes("Reusable") ||
              (selectedItem.Category as string[]).includes(
                "Recyclable and Reusable"
              )
            )
              return (
                <div className="w-full py-6 px-2 bg-blue-700 rounded-2xl text-gray-100 font-light text-md text-center border-4 border-blue-500">
                  😀 Yay! You can RECYCLE or REUSE it.
                </div>
              );
            else if ((selectedItem.Category as string[]).includes("Recyclable"))
              return (
                <div className="w-full py-6 px-2 bg-blue-700 rounded-2xl text-gray-100 font-light text-xl text-center border-4 border-blue-500">
                  🙂 Yay! You can RECYCLE it.
                </div>
              );
            else if ((selectedItem.Category as string[]).includes("Reusable"))
              return (
                <div className="w-full py-6 px-2 bg-blue-700 rounded-2xl text-gray-100 font-light text-xl text-center border-4 border-blue-500">
                  🙂 Yay! You can REUSE it.
                </div>
              );
            else {
              return (
                <>
                  <div className="w-full py-6 px-2 bg-red-700 rounded-2xl text-gray-100 font-light text-xl text-center border-4 border-red-500">
                    🙁 Sorry! You cannot RECYCLE or REUSE it.
                  </div>
                </>
              );
            }
          })()}

          {/* Recycle and Reuse buttons */}
          <div className="flex items-center flex-nowrap space-x-2 py-2">
            {(() => {
              if (selectedItem.Material) {
                return (
                  <>
                    {(selectedItem.Category as string[]).includes(
                      "Recyclable"
                    ) && (
                      <div
                        onClick={() => {
                          // setIsRecycling(true);
                          // setIsReusing(false);
                        }}
                        className="flex-grow flex w-full py-6 px-2 bg-gray-700 rounded-2xl text-gray-100 font-light text-xl justify-center items-center border-4 border-gray-500 hover:bg-gray-600 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <Image
                            alt="Recycle Icon"
                            src="/assets/lab/icons8-recycle.svg"
                            width={50}
                            height={50}
                            className="w-10 h-10 mr-2 text-white"
                          />
                          Recycle It!
                        </div>
                      </div>
                    )}
                    {(selectedItem.Category as string[]).includes(
                      "Reusable"
                    ) && (
                      <div
                        onClick={() => {
                          // setIsReusing(true);
                          // setIsRecycling(false);
                        }}
                        className="flex-grow flex w-full py-6 px-2 bg-green-700 rounded-2xl text-gray-100 font-light text-xl justify-center items-center border-4 border-green-500 hover:bg-green-600 cursor-pointer"
                      >
                        <Image
                          alt="Recycle Icon"
                          src="/assets/lab/plant-garden-svgrepo-com.svg"
                          width={50}
                          height={50}
                          className="w-10 h-10 mr-2"
                        />
                        Reuse It!
                      </div>
                    )}
                  </>
                );
              }
            })()}
          </div>

          {/* Recycling and Reusing */}
          <div>
            <h2 className="text-red-950 text-xl py-3">
              Envirnomental Impact:{" "}
            </h2>
            <p className="text-gray-500">
              {selectedItem["Environmental impact"]}
            </p>
            <h2 className="text-red-950 text-xl py-3">Innovative methods: </h2>
            <p className="text-gray-500">
              {selectedItem["Innovative methods"]}
            </p>
          </div>

          {/* Related Videos */}
          <div>
            <p className="text-red-950 text-xl py-3">Related Videos:</p>
            <VideoSwiper
              height={300}
              videos={videos.map((video) => ({
                title: video.Title,
                url: video.URL,
                thumbnail: video.Thumbnail_URL,
                description: video.Description,
              }))}
            />
          </div>
          {/* Nearby NGOs amd Recycling Locations */}
          {(() => {
            if (
              (selectedItem.Category as string[]).includes("Recyclable") ||
              (selectedItem.Category as string[]).includes("Reusable") ||
              (selectedItem.Category as string[]).includes(
                "Recyclable and Reusable"
              )
            ) {
              return (
                <>
                  <p className="text-red-950 text-xl py-3">Neaby NGOs</p>
                  <div>
                    {nearbyNGOs.length !== 0 && (
                      <GooogleMapsMarkerWindow markers={nearbyNGOs} />
                    )}
                  </div>
                  {nearbyNGOs.length === 0 && !isLoading ? (
                    <ServerChatBubble>Sorry, no NGOs found.</ServerChatBubble>
                  ) : (
                    nearbyNGOs
                      .filter((loc) => loc)
                      .map((dumpingLocation: PlaceResult) => (
                        <Button
                          key={dumpingLocation.place_id}
                          className="w-full text-lg mt-5 py-7 border-4 border-slate-600 bg-slate-700 hover:bg-slate-500 overflow-hidden"
                          asChild
                        >
                          <Link
                            href={`https://www.google.com/maps/place/?q=place_id:${dumpingLocation.place_id}`}
                            target="_blank"
                          >
                            {dumpingLocation.name}
                          </Link>
                        </Button>
                      ))
                  )}
                </>
              );
            } else {
              return (
                <>
                  <p className="text-red-950 text-xl py-3">
                    Nearby Dumping Locations:
                  </p>
                  <div>
                    {nearbyDumpingLocations.length !== 0 && (
                      <GooogleMapsMarkerWindow
                        markers={nearbyDumpingLocations}
                      />
                    )}
                  </div>
                  {nearbyDumpingLocations.length === 0 && !isLoading ? (
                    <ServerChatBubble>
                      Sorry, no Dumping locations found.
                    </ServerChatBubble>
                  ) : (
                    nearbyDumpingLocations
                      .filter((loc) => loc)
                      .map((dumpingLocation: PlaceResult) => (
                        <Button
                          key={dumpingLocation.place_id}
                          className="w-full text-lg mt-5 py-7 border-4 border-slate-600 bg-slate-700 hover:bg-slate-500 overflow-hidden"
                          asChild
                        >
                          <Link
                            href={`https://www.google.com/maps/place/?q=place_id:${dumpingLocation.place_id}`}
                            target="_blank"
                          >
                            {dumpingLocation.name}
                          </Link>
                        </Button>
                      ))
                  )}
                </>
              );
            }
          })()}
        </div>
      )}
    </>
  );
}

const fetchNeabyDumpingLocations = async (location: string) => {
  try {
    const response = await fetchNearbyPlaces({
      query: "Dumping Locations",
      location: {
        lat: parseFloat(location.split(",")[0]),
        lng: parseFloat(location.split(",")[1]),
      },
      radius: 10000,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });
    return response;
  } catch (error) {
    console.error("Error fetching nearby dumping locations:", error);
    return [];
  }
};

const fetchNearbyNGOs = async (location: string) => {
  try {
    const response = await fetchNearbyPlaces({
      query: "NGOs",
      location: {
        lat: parseFloat(location.split(",")[0]),
        lng: parseFloat(location.split(",")[1]),
      },
      radius: 10000,
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    });
    return response;
  } catch (error) {
    console.error("Error fetching nearby NGOs:", error);
    return [];
  }
};
