import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SidebarAdmin from "@/components/common/SideBarAdmin";
import { Upload } from "lucide-react";

interface Product {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  time_delivery: string;
  produced_in: string;
  brand: string;
  thc_min: string;
  thc_max: string;
  cbd_min: string;
  cbd_max: string;
}

interface InputWithLabelProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function InputWithLabel({ id, label, value, onChange, type = "text" }: InputWithLabelProps) {
  return (
    <div className="space-y-4">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        name={id}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
}

export default function EditProduct() {
  const router = useRouter();
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
    imageUrl: "https://www.bccannabisstores.com/cdn/shop/files/1062860_1800x1800.jpg?v=1684339496",
    time_delivery: "",
    produced_in: "",
    brand: "",
    thc_min: "",
    thc_max: "",
    cbd_min: "",
    cbd_max: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    }
  };
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex flex-1 flex-col p-4 md:flex-row">
        <div className="flex-1 space-y-4 p-4">
          <div className="relative text-center">
            <label htmlFor="upload-image" className="cursor-pointer">
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt="Product"
                className="mb-4 rounded-lg object-cover shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
                style={{ width: "100%", height: "100%" }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:bg-opacity-50">
                <Upload size={32} />
              </div>
            </label>
            <input
              type="file"
              id="upload-image"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="flex-1">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-3 gap-1">
              <TabsTrigger value="info">General Info</TabsTrigger>
              <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <InputWithLabel
                id="name"
                label="Name"
                value={product.name}
                onChange={handleInputChange}
              />
              <InputWithLabel
                id="description"
                label="Description"
                value={product.description}
                onChange={handleInputChange}
              />
              <InputWithLabel
                id="price"
                type="number"
                label="Price"
                value={product.price}
                onChange={handleInputChange}
              />
            </TabsContent>
            <TabsContent value="manufacturing">
              <InputWithLabel
                id="time_delivery"
                label="Time Delivery"
                value={product.time_delivery}
                onChange={handleInputChange}
              />
              <InputWithLabel
                id="produced_in"
                label="Produced In"
                value={product.produced_in}
                onChange={handleInputChange}
              />
              <InputWithLabel
                id="brand"
                label="Brand"
                value={product.brand}
                onChange={handleInputChange}
              />
            </TabsContent>
            <TabsContent value="specifications">
              <InputWithLabel
                id="thc_min"
                type="number"
                label="THC Min (%)"
                value={product.thc_min}
                onChange={handleInputChange}
              />
              <InputWithLabel
                id="thc_max"
                type="number"
                label="THC Max (%)"
                value={product.thc_max}
                onChange={handleInputChange}
              />
              <InputWithLabel
                id="cbd_min"
                type="number"
                label="CBD Min (%)"
                value={product.cbd_min}
                onChange={handleInputChange}
              />
              <InputWithLabel
                id="cbd_max"
                type="number"
                label="CBD Max (%)"
                value={product.cbd_max}
                onChange={handleInputChange}
              />
            </TabsContent>
          </Tabs>
          <Button
            onClick={() => alert("Product updated!")}
            variant="default"
            className="mt-4"
          >
            Update Product
          </Button>
        </div>
      </div>
    </div>
  );
}