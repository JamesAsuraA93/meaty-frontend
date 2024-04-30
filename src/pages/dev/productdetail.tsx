// import Navbar from "@/components/common/NavBar";
import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Plus, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1); // สร้าง state สำหรับจำนวนสินค้าและฟังก์ชันเพิ่มค่า

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 bg-[#F7F5F3]">
        <div className="max-w-[100%] pt-10">
          <div className="flex pl-20">
            <ChevronLeft />
            <p>Back</p>
          </div>
          <Image
            className="m-auto "
            src="/file 2.png"
            alt="meat"
            width={400}
            height={400}
          />
          <div className="pb-10 pl-20 ">
            <h1 className="pb-5 text-3xl">Feedback</h1>
            <div className="flex ">
              <Input
                className="max-w-[60%] border-none bg-[#EDEAE7] text-[#858585]"
                placeholder="Share yours feedback here!"
              />
              <Button className="ml-5 max-w-[25%] p-3">Enter feedback</Button>
            </div>
          </div>
          <div className="ml-20 max-w-[75%] rounded-[20px] bg-white p-3">
            <div className="flex justify-between">
              <h1 className="text-[#383634]">Anonymous</h1>
              <h1 className="text-green-500 ">Positive</h1>
            </div>
            <p>It&apos;s was nice I&apos;m very very high right now!!!</p>
          </div>
          <div className="ml-20 mt-5 max-w-[75%] rounded-[20px] bg-white p-3">
            <div className="flex justify-between ">
              <h1 className="text-[#383634]">Anonymous</h1>
              <h1 className="text-red-500">Negative</h1>
            </div>
            <p>It&apos;s was so bad because I feeling dizzy</p>
          </div>
        </div>
        <div>
          <h1 className="mt-5 text-4xl">Blueberry Seagal</h1>
          <div className="flex items-center pt-5">
            <Badge variant="outline" className="p-2 text-green-500">
              In stock <ShieldCheck />
            </Badge>
            <p className="pl-5">Delivery: 1-3 business days</p>
          </div>
          <div className="flex pb-1 pt-5">
            <p className="text-[#858585]">Produced in:</p>
            <p className="pl-9">Ontario</p>
          </div>
          <div className="flex pb-1">
            <p className="text-[#858585]">Brand:</p>
            <p className="pl-20">Color Cannabis</p>
          </div>
          <div className="flex pb-1">
            <p className="text-[#858585]">THC:</p>
            <p className="pl-20">230-280 mg/g</p>
          </div>
          <div className="flex pb-5">
            <p className="text-[#858585]">CBD:</p>
            <p className="pl-20">0-20 mg/g</p>
          </div>
          <div className="flex max-w-[90%] items-center justify-between gap-3 rounded-[20px] bg-white p-5">
            <div>
              <h1 className="text-3xl">
                Total: ${(1.5 * quantity).toFixed(2)}
              </h1>
              <p className="text-red-500">$ 1.50 / 1g</p>
            </div>
            <div className="absolute ml-52 flex">
              <Button
                onClick={decrementQuantity}
                id="decrement"
                className="re rounded-l-md bg-white px-4 py-2 text-blue-600"
              >
                -
              </Button>
              <Input
                type="number"
                min="1"
                max="100"
                value={quantity}
                readOnly
                className="w-16 bg-white text-center"
              />
              <Button
                onClick={incrementQuantity}
                id="increment"
                className="rounded-r-md bg-white px-4 py-2 text-blue-600"
              >
                +
              </Button>
            </div>
            <div>
              <Button className="mr-0">
                Add to cart <Plus />
              </Button>
            </div>
          </div>

          <div>
            <h1 className="pt-5 text-3xl">Description:</h1>
            <p className="pt-5 text-[#858585]">
              Blueberry Seagal whole flower is an indica-dominant strain with
              strong THC potency potential, hand-selected by Color’s brilliant
              phenotype hunters. This cultivar has light green buds with light
              orange hues throughout, hitting the nose with crisp notes of berry
              and pepper from the dominant terpenes Beta-Caryophyllene and
              Nerolidol. Their elevated growing practices, including full
              temperature and humidity control and hang-drying, guarantee a
              consistent smoking experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
