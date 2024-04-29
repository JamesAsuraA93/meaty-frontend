/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "./ProductCard"
import axios from "axios";


export default function CarouselSize() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8002/product')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="flex justify-center items-center"> 
      <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-[80%]"
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 border-[#F7F5F3]">
              <div className="border-[#F7F5F3]">
                <Card className="border-[#F7F5F3]">
                  <CardContent className="flex aspect-square items-center justify-center p-6 bg-[#F7F5F3] border-[#F7F5F3]">
                    <ProductCard product={product}/>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
