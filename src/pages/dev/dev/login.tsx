import React from "react";
import Navbar from "@/components/common/NavBar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutComplete() {
  return <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-[#F7F5F3]">
        <div>
            <h1 className="text-center text-[#383634] text-3xl">Meaty</h1>
            <div className="grid w-full max-w-sm items-center gap-2.5 pt-10 text-[#858585]">
                <Label htmlFor="email">Username</Label>
                <Input type="email" id="username" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2.5 pt-5 text-[#858585]">
                <Label htmlFor="email">Password</Label>
                <Input type="password" id="password"  />
            </div>
            <div className="flex justify-center items-center flex-col">
                <Button className="justify-center mt-5 w-60 h-10 text-white bg-[#5A934C]">Login</Button>
                <p className="text-xs pt-2">
                    Don&apos;t have an account yet? <Link href="/dev/createaccount" className="underline">Sign Up</Link>
                </p>
            </div>
            </div>
        </div>

    </>;
}