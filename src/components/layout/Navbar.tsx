import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDownIcon,
  CircleDollarSignIcon,
  CircleUserRoundIcon,
  LayoutGridIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { PATH_WEBSITE } from "@/config/pathWebsites";

export default function Navbar() {
  const router = useRouter();
  return (
    <>
      <nav className="flex flex-row items-center justify-between bg-[#F7F5F3] px-10 py-2">
        <div className="flex flex-row items-center justify-center gap-4">
          <Link href={PATH_WEBSITE.HOME}>
            <Image src="/graphic/logo.png" alt="logo" width={80} height={80} />
          </Link>
          <div className="relative flex items-center">
            <Input
              className="mt-5 max-w-[90%] rounded-md p-2 text-sm"
              type="name"
              placeholder="Search"
            />
            <Search
              className="absolute right-8 top-10 -translate-y-1/2 transform"
              size={20}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                void router.push("/products");
              }}
              variant={"ghost"}
              className="gap-2 px-2"
            >
              <LayoutGridIcon />
              All Products
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="inline-flex items-center justify-center gap-1">
            <CircleDollarSignIcon className="h-4 w-4" />
            Credits : {9999} $
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2">
                <CircleUserRoundIcon className="h-5 w-5" />
                James
                <ChevronDownIcon className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => {
                    void router.push("/profile");
                  }}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => {
                    void router.push("/order");
                  }}
                >
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => {
                    void router.push("/cart");
                  }}
                >
                  Cart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Button variant={"outline"} className="inline-flex gap-2">
              <ShoppingCartIcon className="h-4 w-4" />
              Cart: 0
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
