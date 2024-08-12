import { Button } from "@/components/ui/button";
import { LinkedinIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ITeamProps {}

export default function Team(props: ITeamProps) {
  return (
    <div className="max-w-7xl mx-auto flex justify-center flex-col pt-10">
      <h1 className="text-6xl text-center font-semibold leading-[5rem] p-2 py-10">
        Meet <strong className="text-primary">Avartians</strong>
      </h1>

      <div className="w-full flex justify-center flex-wrap flex-row-reverse">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl text-left font-semibold leading-8 p-2 px-4">
            Our Aim
          </h2>
          <p className="text-xl font-light leading-8 py-5 px-6 text-gray-500 break-words text-justify">
            At the heart of Avarta is a passionate and dedicated team, driven by
            a shared vision of a sustainable and eco-friendly future. Each
            member brings unique insights and expertise, contributing to the
            app&apos;s success. Comprising talented data scientists, proficient
            frontend and backend developers, and a dedicated DevOps engineer, we
            work harmoniously to uphold standards of excellence and drive
            innovation. Join us in celebrating the incredible minds behind
            Avarta by watching the video and learning about their contributions.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="w-full">
            <iframe
              className="w-full h-[360px] shadow-sm"
              src="https://www.youtube.com/embed/AcP7PBKj52w?si=kNogc_bejgRKerVz"
              title="YouTube video player"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <h1 className="text-6xl text-center font-semibold leading-[5rem] p-2 py-10">
        <strong className="text-primary">Who</strong> We Are?
      </h1>
      <div className="flex flex-wrap w-full max-w-7xl justify-center">
        {team.map((item) => (
          <div
            key={item.title}
            className="flex w-full lg:w-1/3 xl:w-1/4 flex-col p-2 py-10"
          >
            <div className="p-2 border rounded-sm">
              <Image
                loading="lazy"
                className="w-[250px] h-[250px] rounded-full mx-auto"
                src={item.image}
                alt="Logo"
                width={300}
                height={300}
              />
              <div className="p-2">
                <h2 className="text-xl font-medium py-4">{item.title}</h2>
                <h3 className="text-lg font-light py-2 ">{item.desig}</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="text-md font-regular text-center"
                  >
                    <Link
                      href={`mailto:${item.email}`}
                      className="text-md py-2"
                    >
                      <MailIcon className="w-6 h-6 inline mr-1" /> Send Email
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="default"
                    className="text-md font-regular text-center bg-blue-600 hover:bg-blue-500"
                  >
                    <Link href={item.linkedin} className="text-md py-2">
                      <LinkedinIcon className="w-6 h-6 inline mr-1" /> Connect
                      on LinkedIn
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const team = [
  {
    title: "P.N. Chandra Ramu",
    desig: "Founder, CEO & GenAI Head",
    email: "suryacharandiv143@gmail.com",
    linkedin: "http://www.linkedin.com/in/chandraai/",
    image: "/assets/team/chandra.png",
  },
  {
    title: "Rahul Ramesh",
    desig: "Co-Founder & Brand Head",
    email: "rahulgautama97@gmail.com",
    linkedin: "http://www.linkedin.com/in/rahul-ramesh97",
    image: "/assets/team/rahul.png",
  },
  {
    title: "Savinay Kumar",
    desig: "Lead Developer & AI Scientist",
    email: "savinaykumar@outlook.com",
    linkedin: "https://www.linkedin.com/in/codesark/",
    image: "/assets/team/savinay.png",
  },
  {
    title: "Suhas M G",
    desig: "AI Scientist & Creative Head",
    email: "suhasmg98@gmail.com",
    linkedin: "https://www.linkedin.com/in/suhas-ghatti-4b39561a1/",
    image: "/assets/team/suhas.png",
  },
  {
    title: "Abhishek Kesare",
    desig: "Platform & ML/LLMOps Lead",
    email: "abhikesare9@gmail.com",
    linkedin: "http://Linkedin.com/in/abhishek-kesare",
    image: "/assets/team/abhishek.png",
  },
  {
    title: "S.Shribala",
    desig: "Lead GenAI Scientist",
    email: "sribalagayatri@gmail.com",
    linkedin: "http://www.linkedin.com/in/sshribala",
    image: "/assets/team/shribala.png",
  },
  {
    title: "Dhanushri R",
    desig: "GenAI Scientist & Backend Dev",
    email: "dhanushri19112001@gmail.com",
    linkedin: "http://www.linkedin.com/in/dhanu19",
    image: "/assets/team/dhanushri.png",
  },
  {
    title: "Keerthana Devaraj",
    desig: "Gen AI Scientist",
    email: "keerthanadevaraj11@gmail.com",
    linkedin: "http://www.linkedin.com/in/dkeerthana",
    image: "/assets/team/keerthana.png",
  },
  {
    title: "Pavan Yidapalapati",
    desig: "Gen AI Scientist",
    email: "pvsy11@gmail.com",
    linkedin: "https://www.linkedin.com/in/pavanAI/",
    image: "/assets/team/pavan-genai.jpg",
  },

  {
    title: "Pavan Rayabagi",
    desig: "Frontend & DevOps Engineer",
    email: "pavanrayabagi1@gmail.com",
    linkedin: "https://www.linkedin.com/in/pavan731/",
    image: "/assets/team/pavan-rayabagi.png",
  },
  {
    title: "Sejal Kaul",
    desig: "Full Stack Developer",
    email: "sejals.kaul@gmail.com",
    linkedin: "https://www.linkedin.com/in/sejal-kaul-441b41270/",
    image: "/assets/team/sejal.png",
  },
  {
    title: "Nithin P S",
    desig: "Graphic Designer & Video Editor",
    email: "nithinps620@gmail.com",
    linkedin: "http://www.linkedin.com/in/nithinps620",
    image: "/assets/team/nithin.png",
  },
  {
    title: "Samraddha",
    desig: "Asst. Project Manager",
    email: "samraddha@volvo.com",
    linkedin: "https://www.linkedin.com/in/sam1506/",
    image: "/assets/team/sammrudha.png",
  },
  {
    title: "Mohan Sai",
    desig: "Developer & AI Scientist",
    email: "suryacharandiv143@gmail.com",
    linkedin: "https://www.linkedin.com/in/mohan-sai-k-a078b6232/",
    image: "/assets/team/mohan.png",
  },
];
