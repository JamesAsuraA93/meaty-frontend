// import Navbar from "@/components/common/NavBar";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function createaccount() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center bg-[#F7F5F3]">
        <div>
          <h1 className="text-center text-3xl text-[#383634]">Meaty</h1>
          <div className="flex gap-2.5 pt-10 text-[#858585]">
            <div className="mb-5 w-full">
              <Label htmlFor="email">Username</Label>
              <Input type="email" id="username" />
            </div>
            <div className="mb-5 w-full">
              <Label htmlFor="date">Birth date</Label>
              <DatePicker
                callback={function (date: Date): void {
                  throw new Error(
                    `"Function not implemented. ${date.toISOString()}"`,
                  );
                }}
              />
            </div>
          </div>
          <div className="flex gap-2.5 pt-10 text-[#858585]">
            <div className="mb-5 w-full">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" />
            </div>
            <div className="mb-5 w-full">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input type="password" id="confirm-password" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="mt-5 h-10 w-60 justify-center bg-[#5A934C] text-white">
              Login
            </Button>
            <p className="pt-2 text-xs">
              Have an account yet?{" "}
              <Link href="/dev/login" className="underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
