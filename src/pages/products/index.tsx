import Navbar from "@/components/common/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";

export default function Products() {
  return (
    <>
      <Navbar />

      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/3">...</CarouselItem>
          <CarouselItem className="basis-1/3">...</CarouselItem>
          <CarouselItem className="basis-1/3">...</CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}
