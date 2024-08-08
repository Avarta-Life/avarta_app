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

export interface IItemDescriptionProps {
  itemsInImage: any;
  selectedItem: any;
  setSelectedItem: any;
  axiosClient: Axios;
}

export default function ItemDescription({
  itemsInImage,
  selectedItem,
  setSelectedItem,
  axiosClient,
}: IItemDescriptionProps) {
  const [isRecycling, setIsRecycling] = React.useState(false);
  const [isReusing, setIsReusing] = React.useState(false);
  const [isNonRecyclable, setIsNonRecyclable] = React.useState(false);
  const [location, _] = useLocalStorage("location", "");
  const [nearbyDumpingLocations, setNearbyDumpingLocations] = React.useState<
    PlaceResult[]
  >([]);

  const [isLoading, setIsLoading] = React.useState(false);

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
                setIsRecycling(false);
                setIsReusing(false);
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
              (selectedItem.Category as string[]).includes("Recyclable") &&
              (selectedItem.Category as string[]).includes("Reusable") &&
              (selectedItem.Category as string[]).includes(
                "Recyclable and Reusable"
              )
            )
              return (
                <div className="w-full py-6 px-2 bg-blue-700 rounded-2xl text-gray-100 font-light text-xl text-center border-4 border-blue-500">
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

                  <p className="text-red-950 text-xl py-3">
                    Neaby Dumping Locations
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
                      Sorry, no dumping locations found.
                    </ServerChatBubble>
                  ) : (
                    nearbyDumpingLocations
                      .filter((loc) => loc)
                      .map((dumpingLocation: PlaceResult) => (
                        <Button
                          key={dumpingLocation.place_id}
                          className="w-full text-lg mt-5 py-7 border-4 border-slate-600 bg-slate-700 hover:bg-slate-500"
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
                          setIsRecycling(true);
                          setIsReusing(false);
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
                          setIsReusing(true);
                          setIsRecycling(false);
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

          {isRecycling && (
            <>
              <ServerChatBubble>
                Here are the steps for <strong>Recycling</strong>
              </ServerChatBubble>
              {(async () => {
                const dumpingLocations = await fetchNeabyDumpingLocations(
                  location
                );

                return (
                  <div className="flex flex-col gap-y-2">
                    {dumpingLocations.map((location, index) => (
                      <div
                        key={index}
                        className="w-full py-6 px-2 bg-gray-700 rounded-2xl text-gray-100 font-light text-xl text-center border-4 border-gray-500"
                      >
                        <Link
                          href={`https://www.google.com/maps/search/?api=1&query=${location.location.lat},${location.location.lng}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {location.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </>
          )}
          {isReusing && (
            <ServerChatBubble>
              Here are the steps for <strong>Reusing</strong>
            </ServerChatBubble>
          )}
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
