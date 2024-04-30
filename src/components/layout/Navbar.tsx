import React, { useEffect } from "react";
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
import axios from "axios";

export type Self = {
  email: string;
  name: string;
  role: string;
  credits: number;
  cart: [];
};

type Props = {
  callback?: (data: Self) => void;
};

export default function Navbar(props: Props) {
  const router = useRouter();

  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  const [data, setData] = React.useState<Self | null>(null);

  useEffect(() => {
    const getSelf = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(
        //   {
        //     response,
        //   },
        //   {
        //     data: response.data,
        //   },
        // );
        if (response.status === 200) {
          setData({
            email: response.data.email,
            name: response.data.name,
            role: response.data.role,
            credits: response.data.credit,
            cart: response.data.Basket,
          });
          localStorage.setItem("email", response.data.email as string);
          setIsLogin(true);
        }
        props.callback?.({
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          credits: response.data.credit,
          cart: response.data.Basket,
        });

        // setData(response.data as any);
      } catch (error) {
        console.error(error);
      }
    };
    void getSelf();
  }, []);

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
            Credits : {data?.credits} $
          </div>
          {isLogin ? (
            <>
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
                        // void router.push("/order");
                        void router.push("/checkout");
                      }}
                    >
                      Orders
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={() => {
                        // void router.push("/cart");
                        void router.push("/checkout");
                      }}
                    >
                      Cart
                    </DropdownMenuItem> */}

                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={() => {
                        // void router.push("/cart");
                        localStorage.removeItem("token");
                        setIsLogin(false);
                        void router.push(PATH_WEBSITE.HOME);
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Button
                  onClick={() => {
                    void router.push("/checkout");
                  }}
                  variant={"outline"}
                  className="inline-flex gap-2"
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  Cart: {data?.cart.length}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => {
                    void router.push(PATH_WEBSITE.LOGIN);
                  }}
                  variant={"outline"}
                >
                  Login
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    void router.push(PATH_WEBSITE.REGISTER);
                  }}
                  variant={"outline"}
                >
                  Register
                </Button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
