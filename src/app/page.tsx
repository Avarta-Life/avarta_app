import HeroSlider from "@/components/hero-slider/HeroSlider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen">
      {/* HeroSlider */}
      <div className=" mx-auto flex justify-center">
        <div className="relative bg-white w-full max-h-[7000px] min-h-[500px] h-[70vh]">
          <div className="absolute w-full h-full">
            <HeroSlider />
          </div>
          <div className="absolute z-10 w-full h-full bg-green-800 bg-opacity-30 flex flex-col">
            <div className="flex flex-1 w-full justify-center items-center">
              <div className="w-full text-center">
                <h1
                  className={cn(
                    "text-6xl text-white font-semibold leading-[5rem] p-2"
                  )}
                >
                  Start{" "}
                  <span
                    className={cn(
                      "bg-white text-primary px-4 py-2 font-semibold rounded-md "
                    )}
                  >
                    RECYCLING
                  </span>{" "}
                  Today
                </h1>
                <div className="flex justify-center pt-10 gap-4">
                  <Link href="/download">
                    <Image
                      src="/download/google-play.png"
                      alt="Logo"
                      width={200}
                      height={70}
                    />
                  </Link>
                  <Link href="/download">
                    <Image
                      src="/download/app-store.png"
                      alt="Logo"
                      width={200}
                      height={70}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End HeroSlider */}
      <div className="max-w-7xl mx-auto flex justify-center flex-col pt-10">
        <h1 className="text-6xl text-center font-semibold leading-[5rem] p-2">
          Discover The <strong className="text-primary">Avarta Vision</strong>
        </h1>
        <p className="text-xl text-center font-light leading-2 p-2 px-4 text-gray-400 break-words">
          At Avarta, we envision a world where waste is a thing of the past, and
          every item is given a chance for a second life. Inspired by the{" "}
          <span className="text-primary font-medium">
            Sanskrit word &lsquo;Avarta&rsquo;, meaning recycle, revolve, or
            repeated use
          </span>
          .
          <br />
          <br />
          Our app embodies the essence of circular living. Our journey began
          with a simple yet profound idea: to transform how people perceive and
          manage waste. We believe that every piece of trash holds untapped
          potential, and with a touch of creativity, it can be reimagined into
          something valuable.
          <br />
          <br />
          Avartha was born out of our passion for sustainability and our
          commitment to preserving the planet for future generations. By
          providing innovative recycling solutions, we aim to empower
          individuals to make eco-friendly choices effortlessly. Join us in this
          exciting revolution, where together, we can reshape our world and
          redefine waste, one recyclable item at a time.
        </p>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {/* {.map((artwork) => (
              <figure key={artwork.artist} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={artwork.art}
                    alt={`Photo by ${artwork.artist}`}
                    className="aspect-[3/4] h-fit w-fit object-cover"
                    width={300}
                    height={400}
                  />
                </div>
                <figcaption className="pt-2 text-xs text-muted-foreground">
                  Photo by{" "}
                  <span className="font-semibold text-foreground">
                    {artwork.artist}
                  </span>
                </figcaption>
              </figure>
            ))} */}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </main>
  );
}
