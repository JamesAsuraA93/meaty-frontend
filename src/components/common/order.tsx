import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleDollarSign, HandCoins, X } from "lucide-react";
import React, { useState } from "react";
import Navbar from "@/components/common/NavBar";
import Image from "next/image";

export default function Order() {
    const [quantity, setQuantity] = useState(1); // สร้าง state สำหรับจำนวนสินค้าและฟังก์ชันเพิ่มค่า

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  return (
    <div className="flex justify-between items-center border-b pt-5 pb-5">
        <div className="flex">
        <Image src="/file 2.png" alt="cannabis" width={50} height={50} />
        <div className='pl-5'>
          <p>Blueberry Seagle</p>
          <div className='flex '>
             <Button onClick={decrementQuantity} id="decrement" className='text-blue-600 bg-white px-4 py-2 rounded-l-md'>-</Button>
            <Input type="number" min="1" max="100"  value={quantity} readOnly className='text-center bg-white w-16' />
            <Button onClick={incrementQuantity} id="increment" className='text-blue-600 bg-white px-4 py-2 rounded-r-md'>+</Button>
          </div>
        </div>
        </div>
        <div>
          <X />
          <p className="pr-5">$ 3.00</p>
        </div>
      </div>
  )
}
