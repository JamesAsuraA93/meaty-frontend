import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import ProductCard from './ProductCard'

export default function CarouselCard() {
  return (
    <div>
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

    </div>
  )
}
