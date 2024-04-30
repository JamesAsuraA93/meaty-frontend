// import Navbar from "@/components/common/Navbar";
import Navbar from "@/components/layout/Navbar";
import { Typography } from "@/components/typography";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface RootInterface {
  id: number;
  userId: number;
  totalPriceAmount: number;
  discount: number;
  deliveryFee: number;
  status: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  items: Item[];
  Payment: Payment[];
  user: User;
}

export interface Payment {
  id: number;
  orderId: number;
  paymentType: string;
  paymentStatus: string;
  paymentAmount: number;
  paymentDate: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface User {
  id: number;
  birthdate: string;
  email: string;
  password: string;
  role: string;
  credit: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  filePath?: string;
  fileId?: number;
}

export interface Item {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  subtotal: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export default function Order() {
  const router = useRouter();

  const [orders, setOrders] = useState([]); // สร้าง state สำหรับเก็บข้อมูล order และฟังก์ชันเพิ่มค่า

  useEffect(() => {
    // console.log(router.query);
    const getOrderSelf = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const response = await axios.get(
          `http://localhost:8003/my-orders/${email}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // fetch(`${process.env.NEXT_PUBLIC_API}/order/self`, {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });
        // const data = await response.json();
        // console.log({
        //   response,
        // });

        // console.log(response.data);

        // setOrders(response.data as any[]);

        // console.log(data);
        // setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    void getOrderSelf();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex h-full w-full items-center justify-center">
        <Typography typoType="h1">My Order Page</Typography>

        <div className="flex flex-col"></div>
      </div>
    </>
  );
}
