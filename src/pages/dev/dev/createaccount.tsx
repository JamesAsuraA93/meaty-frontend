import React from 'react';
import Navbar from '@/components/common/NavBar';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from '@/components/ui/DatePicker';
import Link from 'next/link'; 

export default function createaccount() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-[#F7F5F3]">
        <div>
          <h1 className="text-center text-[#383634] text-3xl">Meaty</h1>
          <div className="flex gap-2.5 pt-10 text-[#858585]">
            <div className="w-full mb-5">
              <Label htmlFor="email">Username</Label>
              <Input type="email" id="username" />
            </div>
            <div className="w-full mb-5">
              <Label htmlFor="date">Birth date</Label>
              <DatePicker callback={function (date: Date): void {
                throw new Error('Function not implemented.');
              }} />
            </div>
          </div>
          <div className="flex gap-2.5 pt-10 text-[#858585]">
            <div className="w-full mb-5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" />
            </div>
            <div className="w-full mb-5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input type="password" id="confirm-password"  />
            </div>
          </div>
        <div className="flex justify-center items-center flex-col">
            <Button className="justify-center mt-5 w-60 h-10 text-white bg-[#5A934C]">Login</Button>
            <p className="text-xs pt-2">
              Have an account yet? <Link href="/dev/login" className="underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
