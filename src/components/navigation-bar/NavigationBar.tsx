import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export interface INavigationBarProps {}

export default function NavigationBar(props: INavigationBarProps) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="/" className="flex items-center" prefetch={false}>
            <Image
              className=""
              src="/avarta.png"
              alt="Logo"
              width={96}
              height={32}
            />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              href="/"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              About
            </Link>
            {/* <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Services
            </Link> */}
            <Link
              href="/team"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Team
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* <Button variant="outline" size="sm">
              Try Now
            </Button> */}
            <Link href="/download" prefetch={false}>
              <Button size="sm">Try Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
