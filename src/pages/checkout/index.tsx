import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleDollarSign, HandCoins, X } from "lucide-react";
import React, { useState } from "react";
import Navbar from "@/components/common/NavBar";
import Image from "next/image";
import Order from "@/components/common/order";

export default function Checkout() {
  const [quantity, setQuantity] = useState(1); // สร้าง state สำหรับจำนวนสินค้าและฟังก์ชันเพิ่มค่า

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  return <>
  
    <Navbar />
    <div className="flex">
    <div className="w-[50%] ml-10">
      <h1 className="text-3xl pt-5">Checkout</h1>
      <p className="pt-10">Personal Information:</p>
      <div className="flex pt-5">
        <div className="grid w-full max-w-sm items-center gap-1.5 pr-5">
          <Label htmlFor="firstname" className="text-[#858585]">First name</Label>
          <Input type="firstname" id="firstname"  />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 pl-5">
          <Label htmlFor="lname" className="text-[#858585]">Last name</Label>
          <Input type="lname" id="lastname"  />
        </div>
      </div>
      <div className="flex pt-5">
        <div className="grid w-full max-w-sm items-center gap-1.5 pr-5">
          <Label htmlFor="phone" className="text-[#858585]">Phone</Label>
          <Input type="phone" id="phone"  />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 pl-5">
          <Label htmlFor="email" className="text-[#858585]">Email</Label>
          <Input type="email" id="email"  />
        </div>
      </div>
      <h1 className="pt-10 text-3xl">Delivery details:</h1>
      <div className="pt-5">
        <Label htmlFor="address" className="text-[#858585]">Address</Label>
        <Input type="address" id="address"  />
      </div>

      <div className="flex pt-5">
        <div className="grid w-full max-w-sm items-center gap-1.5 pr-5">
          <Label htmlFor="province" className="text-[#858585]">Province</Label>
          <Input type="province" id="province"  />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 pl-5">
          <Label htmlFor="district" className="text-[#858585]">District</Label>
          <Input type="district" id="district"  />
        </div>
      </div>
      <div className="pt-5 w-[40%]">
        <Label htmlFor="postcode" className="text-[#858585]">Post code</Label>
        <Input type="postcode" id="postcode" />
      </div>

      <p className="pt-5">Payment:</p>
      <div className="flex justify-between items-center">
          <div className="flex items-center">
              <Checkbox id="terms" />
              <label
               htmlFor="terms"
               className="text-xm font-medium leading-none pl-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
               >
              Credits 
              </label>
          <CircleDollarSign />
          </div>
          <Button className="justify-center mt-5 w-60 h-10 text-white bg-[#5A934C]">Balance : 9999$</Button>
      </div>
      <div className="flex items-center">
              <Checkbox id="terms" />
              <label
               htmlFor="terms"
               className="text-xm font-medium leading-none pl-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
               >
              Cash on delivery
              </label>
            <HandCoins />
          </div>

    </div>
    <div className="w-[35%] ml-auto pt-5">
      <h1 className="text-2xl">Your order:</h1>
      <div>
        <div className="flex justify-between pt-5"> 
          <p>Subtotal:</p>
          <p className="mr-10">$ 60.00</p>
        </div>
        <div className="flex justify-between pt-1 border-b pb-3"> 
          <p>Delivery:</p>
          <p className="mr-10">$ 4.00</p>
        </div>
      </div>
      <div className="flex justify-between pt-3">
        <h1>Total:</h1>
        <h1 className="mr-10">$64.00</h1>
      </div>
      <Button className="justify-center mt-5 w-[90%] h-10 text-white bg-[#5A934C] pr-3">Purchase</Button>
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
    </div>
    </div>
  </>;
}

