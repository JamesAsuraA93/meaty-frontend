import CarouselCard from "@/components/common/CarouselCard";
import Navbar from "@/components/layout/Navbar";
// import Navbar from '@/components/common/NavBar';
import { ChevronRight, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-center pt-10">
        <Link href="/destination-path">
          <a className="ml-5 rounded-lg bg-[#EDEAE7] hover:cursor-pointer">
            <Image
              alt="shop"
              src={"/Shop now Banner (clickable).png"}
              width={500}
              height={800}
            />
          </a>
        </Link>
        <div className="pl-5 hover:cursor-pointer">
          <Image
            alt="promotion"
            src={"/Rectangle 4.png"}
            width={375}
            height={575}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-10 text-center">
        <div className="flex items-center justify-center pl-40">
          <Flame />
          <h1 className="pb-3 pl-1 text-center text-3xl">Feature goods</h1>
        </div>
        <div className="flex pr-40">
          <p className="">View all</p>
          <ChevronRight />
        </div>
      </div>

      <CarouselCard />
    </>
  );
}
