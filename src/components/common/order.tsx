import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
// import Navbar from "@/components/common/NavBar";
import Image from "next/image";

export default function Order() {
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
    <div className="flex items-center justify-between border-b pb-5 pt-5">
      <div className="flex">
        <Image src="/file 2.png" alt="cannabis" width={50} height={50} />
        <div className="pl-5">
          <p>Blueberry Seagle</p>
          <div className="flex ">
            <Button
              onClick={decrementQuantity}
              id="decrement"
              className="rounded-l-md bg-white px-4 py-2 text-blue-600"
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
        </div>
      </div>
      <div>
        <X />
        <p className="pr-5">$ 3.00</p>
      </div>
    </div>
  );
}
