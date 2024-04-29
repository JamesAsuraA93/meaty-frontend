// import Navbar from '@/components/common/NavBar';
import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ChevronLeft, Plus, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface ProductDetail {
  id: number;
  productId: number;
  timeDelivery: string;
  producedIn: string;
  brand: string;
  thcMin: number;
  thcMax: number;
  cbdMin: number;
  cbdMax: number;
  createdBy: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Stock {
  id: number;
  productId: number;
  quantity: number;
  createdBy: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

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
  fileId: string | null;
  stock: Stock;
  productDetail: ProductDetail;
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { product_id } = router.query;

  console.log("id", product_id);

  useEffect(() => {
    if (product_id) {
      axios
        .get(`http://localhost:8002/product/${product_id as string}`)
        .then((response) => {
          setProduct(response.data as Product);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [product_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const imageUrl = `http://localhost:8006/files/${encodeURIComponent(product.filePath)}`;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 bg-[#F7F5F3]">
        <div className="max-w-[100%] pt-10">
          <div className="flex pl-20">
            <ChevronLeft />
            <Link href="/products">
              <p>Back</p>
            </Link>
          </div>
          <Image
            className="m-auto "
            src={imageUrl}
            alt="meat"
            width={400}
            height={400}
          />
          <div className="pb-10 pl-20 ">
            <h1 className="pb-5 text-3xl">Feedback</h1>
            <div className="flex ">
              <Input
                className="max-w-[60%] border-none bg-[#EDEAE7] text-[#858585]"
                placeholder="Share yours feedback here!"
              />
              <Button className="ml-5 max-w-[25%] p-3">Enter feedback</Button>
            </div>
          </div>
          <div className="ml-20 max-w-[75%] rounded-[20px] bg-white p-3">
            <div className="flex justify-between">
              <h1 className="text-[#383634]">Anonymous</h1>
              <h1 className="text-green-500 ">Positive</h1>
            </div>
            <p>It&apos;s was nice I&apos;m very very high right now!!!</p>
          </div>
          <div className="ml-20 mt-5 max-w-[75%] rounded-[20px] bg-white p-3">
            <div className="flex justify-between ">
              <h1 className="text-[#383634]">Anonymous</h1>
              <h1 className="text-red-500">Negative</h1>
            </div>
            <p>It&apos;s was so bad because I feeling dizzy</p>
          </div>
        </div>
        <div>
          <h1 className="mt-5 text-4xl">{product.name}</h1>
          <div className="flex items-center pt-5">
            <Badge variant="outline" className="p-2 text-green-500">
              In stock <ShieldCheck />
            </Badge>
            <p className="pl-5">
              Delivery: {product.productDetail.timeDelivery}
            </p>
          </div>
          <div className="flex pb-1 pt-5">
            <p className="text-[#858585]">Produced in:</p>
            <p className="pl-9">{product.productDetail.producedIn}</p>
          </div>
          <div className="flex pb-1">
            <p className="text-[#858585]">Brand:</p>
            <p className="pl-20">{product.productDetail.brand}</p>
          </div>
          <div className="flex pb-1">
            <p className="text-[#858585]">THC:</p>
            <p className="pl-20">
              {product.productDetail.thcMin}-{product.productDetail.thcMax} mg/g
            </p>
          </div>
          <div className="flex pb-5">
            <p className="text-[#858585]">CBD:</p>
            <p className="pl-20">
              {product.productDetail.cbdMin}-{product.productDetail.cbdMax} mg/g
            </p>
          </div>
          <div className="flex max-w-[90%] items-center justify-between gap-3 rounded-[20px] bg-white p-5">
            <div>
              <h1 className="text-3xl">
                Total: ${(product.price * quantity).toFixed(2)}
              </h1>
              <p className="text-red-500">$ {product.price} / 1g</p>
            </div>
            <div className="absolute ml-52 flex">
              <Button
                onClick={decrementQuantity}
                id="decrement"
                className="re rounded-l-md bg-white px-4 py-2 text-blue-600"
              >
                -
              </Button>
              <Input
                type="number"
                min="1"
                max="100"
                value={quantity}
                readOnly
                className="w-16 bg-white text-center"
              />
              <Button
                onClick={incrementQuantity}
                id="increment"
                className="rounded-r-md bg-white px-4 py-2 text-blue-600"
              >
                +
              </Button>
            </div>
            <div>
              <Button className="mr-0">
                Add to cart <Plus />
              </Button>
            </div>
          </div>

          <div>
            <h1 className="pt-5 text-3xl">Description:</h1>
            <p className="pt-5 text-[#858585]">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
