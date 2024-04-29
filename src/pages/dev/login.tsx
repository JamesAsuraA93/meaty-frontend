import React from "react";
// import Navbar from "@/components/common/NavBar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function CheckoutComplete() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center bg-[#F7F5F3]">
        <div>
          <h1 className="text-center text-3xl text-[#383634]">Meaty</h1>
          <div className="grid w-full max-w-sm items-center gap-2.5 pt-10 text-[#858585]">
            <Label htmlFor="email">Username</Label>
            <Input type="email" id="username" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2.5 pt-5 text-[#858585]">
            <Label htmlFor="email">Password</Label>
            <Input type="password" id="password" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="mt-5 h-10 w-60 justify-center bg-[#5A934C] text-white">
              Login
            </Button>
            <p className="pt-2 text-xs">
              Don&apos;t have an account yet?{" "}
              <Link href="/dev/createaccount" className="underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
