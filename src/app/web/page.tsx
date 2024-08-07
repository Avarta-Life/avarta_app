import HeroSlider from "@/components/hero-slider/HeroSlider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <div className="w-full">
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
                    "text-5xl lg:text-6xl text-white font-semibold leading-[5rem] p-2"
                  )}
                >
                  Start{" "}
                  <span
                    className={cn(
                      "bg-white text-primary text-4xl lg:text-6xl px-4 py-2 font-semibold rounded-md "
                    )}
                  >
                    RECYCLING
                  </span>{" "}
                  Today
                </h1>
                <div className="flex justify-center pt-10 gap-4">
                  <Link href="/download">
                    <Image
                      src="/assets/common/google-play.png"
                      alt="Logo"
                      width={200}
                      height={70}
                    />
                  </Link>
                  <Link href="/download">
                    <Image
                      src="/assets/common/app-store.png"
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
        <h1 className="text-6xl text-center font-semibold leading-[5rem] p-2 mt-10">
          Discover The <strong className="text-primary">Avarta Vision</strong>
        </h1>
        <p className="text-xl text-center font-light leading-8 p-2 px-4 text-gray-500 break-words">
          At Avarta, our vision is to eliminate waste and give every item a
          second chance. Inspired by the{" "}
          <span className="text-primary font-medium">
            {" "}
            Sanskrit word &lsquo;Avarta,&rsquo; which means recycle, revolve,
            and repeated use.
          </span>{" "}
          Central to our approach is the integration of{" "}
          <span className="text-primary font-medium">
            {" "}
            Gemini AI ✨ and advanced LLM (Large Language Model){" "}
          </span>{" "}
          operations, which unlock the hidden potential in every piece of waste.
          <br />
          <br />
          <span className="text-primary font-medium">
            Powered by Google Cloud Services
          </span>
          , we ensure our technology operates on a robust, scalable
          infrastructure, delivering a seamless and impactful user experience.
          our app embodies the spirit of circular living with cutting-edge
          technology.
          <br />
          <br />
          Join us in merging{" "}
          <span className="text-primary font-medium">technology </span>with
          environmental stewardship{" "}
          <span className="text-primary font-medium">
            to create a cleaner, greener future.
          </span>
          Together, we can redefine waste and reshape our world—one recyclable
          item at a time.
        </p>
        <div className="flex flex-wrap w-full max-w-7xl">
          {genesis.map((item) => (
            <div
              key={item.id}
              className="flex w-full lg:w-1/3 flex-col px-4 py-10"
            >
              <Image
                loading="lazy"
                className="w-full rounded-md"
                src={item.image}
                alt="Logo"
                width={300}
                height={200}
              />
              <div>
                <h2 className="text-xl font-medium py-4">{item.title}</h2>
                <p className="text-gray-500 font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-6xl text-center font-semibold leading-[5rem] p-2 mt-10">
          The <strong className="text-primary">Journey </strong>
        </h1>
        <p className="text-xl text-center font-light leading-8 p-2 px-4 text-gray-500 break-words">
          Our journey began with a shared passion among the Avartians: to
          revolutionize how we perceive and manage waste. We came together with
          a transformative idea—one that combines sustainability with advanced
          technology to make a real difference.
          <br />
          <br />
          This drive to create our app is rooted in a collective commitment to
          tackle pressing environmental challenges and develop innovative
          solutions with a global impact.
        </p>
        <div className="flex flex-wrap w-full max-w-7xl ">
          {journey.map((item) => (
            <div
              key={item.id}
              className="flex w-full lg:w-1/3 flex-col px-4 py-10"
            >
              <Image
                loading="lazy"
                className="w-full rounded-md"
                src={item.image}
                alt="Logo"
                width={300}
                height={200}
              />
              <div>
                <h2 className="text-xl font-medium py-4">{item.title}</h2>
                <p className="text-gray-500 font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const genesis = [
  {
    id: 1,
    title: "Classify & Conquer",
    image: "/assets/genesis/classify-conquer-waste.jpg",
    desc: "Avarta classifies objects and guides you on sustainable disposal and reuse",
  },
  {
    id: 2,
    title: "Revolutionize Reuse",
    image: "/assets/genesis/eco-friendly-impact.jpg",
    desc: "Discover innovative ways to reuse everyday items with Avarta's creative solutions.",
  },
  {
    id: 3,
    title: "Your Eco-Friendly Impact",
    image: "/assets/genesis/from-trash-to-treasure.jpg",
    desc: "Understand the environmental impact of your items and make informed choices with Avarta.",
  },
];

const journey = [
  {
    id: 4,
    title: "Recycle Right, Every Time",
    image: "/assets/genesis/recycle-right-every-time.jpg",
    desc: "Avarta helps you identify recyclables and find the best disposal options nearby.",
  },
  {
    id: 5,
    title: "Sustainable Living Made Simple",
    image: "/assets/genesis/revolutionize-reuse.jpg",
    desc: "Empower your eco-friendly habits with Avarta's practical waste management tools.",
  },
  {
    id: 6,
    title: "From Trash to Treasure",
    image: "/assets/genesis/sustainable-living-made-simple.jpg",
    desc: "Transform waste into valuable resources with Avarta's innovative recycling methods.",
  },
];
