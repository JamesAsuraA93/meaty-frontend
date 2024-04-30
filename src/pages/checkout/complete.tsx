import React from "react";
import Image from "next/image";
import { Button } from "src/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
// import Navbar from "@/components/common/NavBar";

export default function CheckoutComplete() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center bg-[#F7F5F3]">
        <div className="w-full max-w-md p-6 text-center">
          <Image alt="logo" src={"/500 1.png"} width={400} height={400} />
          <h1 className="pt-6 text-3xl text-[#383634]">
            Thank You for Your Order!
          </h1>
          <p className="pt-2 text-xs text-[#858585]">
            Your order is being processed and will be shipped in 3-4 business
            days.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-5 h-10 w-60 border border-[#383634] bg-[#F7F5F3] text-[#383634] hover:border-[#5A934C] hover:bg-[#5A934C] hover:text-white"
          >
            Back to home
          </Button>
        </div>
      </div>
    </>
  );
}
