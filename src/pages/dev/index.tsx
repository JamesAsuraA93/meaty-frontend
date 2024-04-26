import { Typography } from "@/components/typography";
import React from "react";
import ProductCard from "@/components/common/ProductCard";
import CarouselCard from "@/components/common/CarouselCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function DevHome() {
  return (
    <div className="pl-5">
      <CarouselCard />
    </div>
  );
}
