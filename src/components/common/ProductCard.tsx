import { CirclePlusIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router"; // Import useRouter
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdBy: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  filePath: string;
  fileId: number | null;
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter(); // Initialize useRouter

  const imageUrl = `http://localhost:8006/files/${encodeURIComponent(product.filePath)}`;

  // Function to handle card click, navigating to the product detail page
  const handleCardClick = () => {
    void router.push(`/products/${product.id}`);
  };

  return (
    <div
      className="w-[250px] cursor-pointer rounded-[20px] border bg-white p-1 hover:border-green-500"
      onClick={handleCardClick}
    >
      <div className="relative flex">
        <Image
          alt="Product"
          src={imageUrl}
          width={150}
          height={150}
          className="absolute -top-14"
        />
        <div className="pt-5">
          <div className="ml-40 flex justify-center">
            <StarIcon
              className="fill-green-900 text-green-900"
              width={20}
              height={20}
            />
            <p className="pl-1 text-sm">5/5</p>
          </div>
          <Badge variant={"red"} className="ml-40 mt-2 text-white">
            ON SALE
          </Badge>
        </div>
      </div>
      <h1 className="ml-3 pt-5">{product.name}</h1>
      <div className="flex justify-between">
        <Button
          variant={"outline"}
          className="ml-3 mt-3 bg-white text-black hover:bg-green-500 hover:text-white"
        >
          Add <CirclePlusIcon width={15} height={15} className="pl-1" />
        </Button>
        <div className="pr-4 text-end">
          <ul className="text-[#383634] line-through">
            {(product.price * 1.2).toFixed(2)}
          </ul>
          <ul className="text-red-500">${product.price.toFixed(2)}</ul>
          <ul className="text-[#CCCBCA]">/1g</ul>
        </div>
      </div>
    </div>
  );
}
