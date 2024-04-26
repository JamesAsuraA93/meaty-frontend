import React from 'react'
import Navbar from '@/components/common/NavBar'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../../components/ui/carousel"
import ProductCard from "@/components/common/ProductCard";
import CarouselCard from '@/components/common/CarouselCard';

export default function homepage() {
  return (
    <>
    <Navbar />
    <div className="flex flex-row pt-10">
        <div className='bg-[#EDEAE7] rounded-lg w-["800px"] h-["375px"] ml-5'>
            <h1 className='pl-20 mx-'>THAI ORGANIC</h1>
            <p>Thai Organic Weed is a chemical-free cannabis from Thailand
                known for its citrusy aroma and energizing effects, 
                ideal for stress relief.</p>
            <Button className="mt-5 text-white bg-[#5A934C]">Shop now</Button>
        </div>
        <div className='pl-5 hover:cursor-pointer'>
            <Image alt='promotion' src={"/Rectangle 4.png"} width={375} height={575}/>
        </div>
        
    </div>
    <Carousel>
        <CarouselContent>
            <CarouselItem className="basis-1/3"><ProductCard /></CarouselItem>
            <CarouselItem className="basis-1/3"><ProductCard /></CarouselItem>
            <CarouselItem className="basis-1/3"><ProductCard /></CarouselItem>
            <CarouselItem className="basis-1/3"><ProductCard /></CarouselItem>
            <CarouselItem className="basis-1/3"><ProductCard /></CarouselItem>
            <CarouselItem className="basis-1/3"><ProductCard /></CarouselItem>
        </CarouselContent>
    </Carousel>
    

    </>
  )
}
