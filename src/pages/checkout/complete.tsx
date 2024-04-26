import React from "react";
import Image from 'next/image'
import { Button } from 'src/components/ui/button'
import Navbar from "@/components/common/NavBar";

export default function CheckoutComplete() {
  return <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-[#F7F5F3]">
      <div className="w-full max-w-md p-6 text-center">
        <Image alt="logo" src={"/500 1.png"} width={400} height={400} />
        <h1 className="pt-6 text-[#383634] text-3xl">Thank You for Your Order!</h1>
        <p className="pt-2 text-[#858585] text-xs">Your order is being processed and will be shipped in 3-4 business days.</p>
        <Button className="mt-5 text-[#383634] bg-[#F7F5F3] border border-[#383634] w-60 h-10 hover:text-white hover:bg-[#5A934C] hover:border-[#5A934C]" >Back to home</Button>
      </div>
    </div>
    </>;
}
